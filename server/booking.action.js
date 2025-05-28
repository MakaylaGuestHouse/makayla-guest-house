"use server";
import { revalidatePath } from "next/cache";
import { isAuthorized } from "@/utils/rolesAccess";
import routes from "@/lib/routes";
import Booking from "@/db/models/bookingSchema.model";
import { logger } from "@/utils/log";
import { connectDb } from "@/db";
import AdminUser from "@/db/models/adminUser.model";
import Room from "@/db/models/roomSchema.model";

const limitNumber = (value) => {
  const maxNumber = 20;
  const defaultLimit = value || 1;
  return Math.min(defaultLimit, maxNumber);
};

export const createBooking = async (bookingData, roomId) => {
  try {
    await connectDb();

    // Calculate total nights
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const totalNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (totalNights <= 0) {
      throw new Error("Invalid date range");
    }

    bookingData.totalNights = totalNights;
    bookingData.createdAt = new Date();

    const booking = await Booking.create(bookingData);

    revalidatePath("/dashboard/bookings");

    return JSON.parse(
      JSON.stringify({
        status: "ok",
        booking,
      })
    );
  } catch (error) {
    logger(error.message);
    return JSON.parse(JSON.stringify({ error: error.message }));
  }
};

export const fetchBooking = async (id) => {
  try {
    await connectDb();

    const booking = await Booking.findById(id)
      .populate("roomId", "name roomType price")
      .populate("creator", "name email");

    revalidatePath("/dashboard/bookings");

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    logger(error.message);
    return null;
  }
};

export async function updateBooking(bookingData, adminId) {
  try {
    await connectDb();
    const user = await AdminUser.findById(adminId);

    if (!user || !isAuthorized(user.role, "superAdmin")) {
      throw new Error("Unauthorized access");
    }

    const bookingToUpdate = await Booking.findById(bookingData._id);

    if (!bookingToUpdate) {
      throw new Error("Booking not found");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingData._id,
      { ...bookingData, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/dashboard/bookings");

    return JSON.parse(JSON.stringify(updatedBooking));
  } catch (error) {
    logger(error.message);
    return JSON.parse(JSON.stringify({ error: error.message }));
  }
}

export const deleteBooking = async (id, adminId) => {
  try {
    await connectDb();

    const user = await AdminUser.findById(adminId);

    if (!user || !isAuthorized(user.role, "superAdmin")) {
      throw new Error("Unauthorized access");
    }

    const bookingToDelete = await Booking.findById(id);

    if (!bookingToDelete) {
      throw new Error("Booking not found");
    }

    await Booking.deleteOne({ _id: id });

    revalidatePath("/dashboard/bookings");

    return { status: 200 };
  } catch (error) {
    logger(error.message);
    return JSON.parse(JSON.stringify({ error: error.message }));
  }
};

export const fetchBookings = async ({ query, limit, skip, status }) => {
  try {
    await connectDb();

    let conditions = {};

    if (query) {
      conditions.$or = [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { roomType: { $regex: query, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      conditions.bookingStatus = status;
    }

    const limitValue = limitNumber(limit);
    const skipAmount = skip || 0;

    const bookings = await Booking.find(conditions)
      .populate("roomId", "name roomType price")
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limitValue);

    const bookingsCount = await Booking.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(bookings)),
      totalPages: Math.ceil(bookingsCount / limitValue),
    };
  } catch (error) {
    logger(error.message);
    return { data: [], totalPages: 0 };
  }
};

export const fetchBookingsBySearch = async ({ query, page, limit, status }) => {
  try {
    await connectDb();

    const skip = (Number(page) - 1) * limitNumber(limit);

    let matchConditions = {};

    if (status && status !== "all") {
      matchConditions.bookingStatus = status;
    }

    let searchPipeline = [
      { $match: matchConditions },
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "user",
        },
      },
    ];

    if (query) {
      searchPipeline.push({
        $match: {
          $or: [
            { fullName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { bookingReference: { $regex: query, $options: "i" } },
            { roomType: { $regex: query, $options: "i" } },
          ],
        },
      });
    }

    searchPipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNumber(limit) }
    );

    const bookings = await Booking.aggregate(searchPipeline);

    // Count pipeline
    const countPipeline = [
      ...searchPipeline.slice(0, -2),
      { $count: "totalCount" },
    ];
    const bookingsCount = await Booking.aggregate(countPipeline);

    const totalCount = bookingsCount[0] ? bookingsCount[0].totalCount : 0;

    revalidatePath(`${routes.search}?q=${query}`);

    return {
      data: JSON.parse(JSON.stringify(bookings)),
      totalPages: Math.ceil(totalCount / limitNumber(limit)),
    };
  } catch (error) {
    logger(error.message);
    return { data: [], totalPages: 0 };
  }
};

export const updateBookingStatus = async (bookingId, status, adminId) => {
  try {
    await connectDb();

    const user = await AdminUser.findById(adminId);

    if (!user || !isAuthorized(user.role, "admin")) {
      throw new Error("Unauthorized access");
    }

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid booking status");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedBooking) {
      throw new Error("Booking not found");
    }

    revalidatePath("/dashboard/bookings");

    return JSON.parse(JSON.stringify(updatedBooking));
  } catch (error) {
    logger(error.message);
    return JSON.parse(JSON.stringify({ error: error.message }));
  }
};
