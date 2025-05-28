"use server";

import { revalidatePath } from "next/cache";
import { isAuthorized } from "@/utils/rolesAccess";
import Inquiry from "@/db/models/inquiry.model";
import { connectDb } from "@/db";
import AdminUser from "@/db/models/adminUser.model";
import { logger } from "@/utils/log";

const limitNumber = (value) => {
  const maxNumber = 20;
  const defaultLimit = value || 1;
  return Math.min(defaultLimit, maxNumber);
};

export const createInquiry = async (inquiry) => {
  try {
    await connectDb();

    inquiry.receivedAt = new Date();

    await Inquiry.create(inquiry);

    revalidatePath("/");

    return JSON.parse(JSON.stringify({ status: "ok" }));
  } catch (error) {
    logger(error.message);
    return JSON.parse(JSON.stringify("Something went wrong"));
  }
};

export const fetchInquiry = async (id, user_id) => {
  try {
    await connectDb();

    const user = await AdminUser.findById(user_id);

    if (!user || !isAuthorized(user.role, "editor")) {
      throw new Error("Unauthorized access");
    }

    const inquiry = await Inquiry.findById(id);

    revalidatePath("/");
    revalidatePath("/inquiry");

    return JSON.parse(JSON.stringify(inquiry));
  } catch (error) {
    logger(error.message);
  }
};

export async function updateInquiry(inquiry, user_id) {
  try {
    await connectDb();
    const user = await AdminUser.findById(user_id);

    if (!user || !isAuthorized(user.role, "superAdmin")) {
      throw new Error("Unauthorized access");
    }

    const inquiryToUpdate = await Inquiry.findById(inquiry._id);

    if (!inquiryToUpdate) {
      throw new Error("Inquiry not found");
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      inquiry._id,
      inquiry,
      { new: true }
    );

    revalidatePath(`${clientRoutes.inquiry}/${inquiry._id}`);

    return JSON.parse(JSON.stringify(updatedInquiry));
  } catch (error) {
    logger(error.message);
  }
}

export const deleteInquiry = async (id, user_id) => {
  try {
    await connectDb();

    const user = await AdminUser.findById(user_id);

    if (!user || !isAuthorized(user.role, "superAdmin")) {
      throw new Error("Unauthorized access");
    }

    const inquiryToDelete = await Inquiry.findById(id);

    if (!inquiryToDelete) {
      throw new Error("Inquiry not found");
    }

    await Inquiry.deleteOne({ _id: id });

    revalidatePath("/");

    return { status: 200 };
  } catch (error) {
    logger(error.message);
  }
};

export const fetchInquiries = async ({ query, limit, skip, isSitemap }) => {
  try {
    await connectDb();

    const conditions = query
      ? {
          $or: [
            { fullName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { subject: { $regex: query, $options: "i" } },
            { message: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const limitValue = limitNumber(limit, isSitemap);
    const skipAmount = skip || 0;

    const inquiries = await Inquiry.find(conditions)
      .sort({ receivedAt: "desc" })
      .skip(skipAmount)
      .limit(limitValue);

    const inquiriesCount = await Inquiry.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(inquiries)),
      totalPages: Math.ceil(inquiriesCount),
    };
  } catch (error) {
    logger(error.message);
  }
};
