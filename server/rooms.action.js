"use server"
import { isUserAuthorized } from "@utils"
import { revalidatePath } from "next/cache"
import { logger } from "@utils/log"
import { connectDb } from "@db"
import User from "@db/models/user.model"
import Room from "@db/models/room.model"
import { mongoSearchPipeline } from "@db/mongoDBConditions"
import { clientRoutes } from "@lib/routes"

const limitNumber = (value) => {
    const maxNumber = 20;
    const defaultLimit = value || 1
    return Math.min(defaultLimit, maxNumber);
}

export const createRoom = async (room, creator_id) => {
    try {
        await connectDb();

        const user = await User.findById(creator_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const sanitizedId = room.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        room.id = sanitizedId;
        room.createdAt = new Date();

        await Room.create(room);

        revalidatePath('/')

        return JSON.parse(JSON.stringify({ status: 'ok' }));
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export const fetchRoom = async (id) => {
    try {
        await connectDb();

        const room = await Room.findOne({ id: id });

        revalidatePath('/');
        revalidatePath('/room');

        return JSON.parse(JSON.stringify(room));
    } catch (error) {
        logger(error.message)
    }
}

export async function updateRoom(room, creator_id) {
    try {
        await connectDb();
        const user = await User.findById(creator_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const roomToUpdate = await Room.findById(room._id)

        if (!roomToUpdate) {
            throw new Error('Room not found')
        }

        const updatedRoom = await Room.findByIdAndUpdate(room._id, room, { new: true });

        revalidatePath(`${clientRoutes.room}/${room.id}`)

        return JSON.parse(JSON.stringify(updatedRoom))
    } catch (error) {
        logger(error.message)
    }
}

export const deleteRoom = async (id, creator_id) => {
    try {
        await connectDb();

        const user = await User.findById(creator_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const roomToDelete = await Room.findById(id)

        if (!roomToDelete) {
            throw new Error('Room not found')
        }

        await Room.deleteOne({ _id: id });

        revalidatePath('/')

        return { status: 200 };
    } catch (error) {
        logger(error.message)
    }
};

export const fetchRooms = async ({ query, limit, skip, isSitemap }) => {
    try {
        await connectDb();

        const conditions = query ? {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { roomType: { $regex: query, $options: 'i' } },
                { id: { $regex: query, $options: 'i' } }
            ]
        } : {};

        const limitValue = limitNumber(limit, isSitemap);
        const skipAmount = skip || 0;

        const rooms = await Room.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const roomsCount = await Room.countDocuments(conditions);

        return { data: JSON.parse(JSON.stringify(rooms)), totalPages: Math.ceil(roomsCount) }
    } catch (error) {
        logger(error.message);
    }
};

export const fetchRoomsBySearch = async ({ query, page, limit }) => {
    try {
        await connectDb();

        const skip = (Number(page) - 1) * limitNumber(limit);
        const searchPipeline = mongoSearchPipeline({ query, skip, limit: limitNumber(limit) });

        const rooms = await Room.aggregate(searchPipeline);

        const countSearchPipeline = mongoSearchPipeline({ query, skip, limit: limitNumber(0) });
        const roomsCount = await Room.aggregate([
            ...countSearchPipeline,
            {
                $count: 'totalCount',
            },
        ]);

        const totalCount = roomsCount[0] ? roomsCount[0].totalCount : 0
        revalidatePath(`${clientRoutes.search}?q'`)
        return { data: JSON.parse(JSON.stringify(rooms)), totalPages: Math.ceil(totalCount) };
    } catch (error) {
        logger(error.message);
    }
};