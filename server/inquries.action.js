"use server"

import { isUserAuthorized } from "@utils"
import { revalidatePath } from "next/cache"
import { logger } from "@utils/log"
import { connectDb } from "@db"
import User from "@db/models/user.model"
import Inquery from "@db/models/inquery.model"
import { mongoSearchPipeline } from "@db/mongoDBConditions"
import { clientRoutes } from "@lib/routes"

const limitNumber = (value) => {
    const maxNumber = 20;
    const defaultLimit = value || 1
    return Math.min(defaultLimit, maxNumber);
}

export const createInquery = async (inquery) => {
    try {
        await connectDb();

        inquery.receivedAt = new Date();

        await Inquery.create(inquery);

        revalidatePath('/')

        return JSON.parse(JSON.stringify({ status: 'ok' }));
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify('Something went wrong'));
    }
}

export const fetchInquery = async (id, user_id) => {
    try {
        await connectDb();

        const user = await User.findById(user_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const inquery = await Inquery.findById(id);

        revalidatePath('/');
        revalidatePath('/inquery');

        return JSON.parse(JSON.stringify(inquery));
    } catch (error) {
        logger(error.message)
    }
}

export async function updateInquery(inquery, user_id) {
    try {
        await connectDb();
        const user = await User.findById(user_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const inqueryToUpdate = await Inquery.findById(inquery._id)

        if (!inqueryToUpdate) {
            throw new Error('Inquery not found')
        }

        const updatedInquery = await Inquery.findByIdAndUpdate(inquery._id, inquery, { new: true });

        revalidatePath(`${clientRoutes.inquery}/${inquery._id}`)

        return JSON.parse(JSON.stringify(updatedInquery))
    } catch (error) {
        logger(error.message)
    }
}

export const deleteInquery = async (id, user_id) => {
    try {
        await connectDb();

        const user = await User.findById(user_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const inqueryToDelete = await Inquery.findById(id)

        if (!inqueryToDelete) {
            throw new Error('Inquery not found')
        }

        await Inquery.deleteOne({ _id: id });

        revalidatePath('/')

        return { status: 200 };
    } catch (error) {
        logger(error.message)
    }
};

export const fetchInqueries = async ({ query, limit, skip, isSitemap }, user_id) => {
    try {
        await connectDb();

        const user = await User.findById(user_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const conditions = query ? {
            $or: [
                { fullName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { subject: { $regex: query, $options: 'i' } },
                { message: { $regex: query, $options: 'i' } }
            ]
        } : {};

        const limitValue = limitNumber(limit, isSitemap);
        const skipAmount = skip || 0;

        const inqueries = await Inquery.find(conditions)
            .sort({ receivedAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const inquiriesCount = await Inquery.countDocuments(conditions);

        return { data: JSON.parse(JSON.stringify(inqueries)), totalPages: Math.ceil(inquiriesCount) }
    } catch (error) {
        logger(error.message);
    }
};

export const fetchInqueriesBySearch = async ({ query, page, limit }, user_id) => {
    try {
        await connectDb();

        const user = await User.findById(user_id);

        if (!user || !isUserAuthorized(user.roles)) {
            throw new Error('Unauthorized access')
        }

        const skip = (Number(page) - 1) * limitNumber(limit);
        const searchPipeline = mongoSearchPipeline({ query, skip, limit: limitNumber(limit) });

        const inqueries = await Inquery.aggregate(searchPipeline);

        const countSearchPipeline = mongoSearchPipeline({ query, skip, limit: limitNumber(0) });
        const inquiriesCount = await Inquery.aggregate([
            ...countSearchPipeline,
            {
                $count: 'totalCount',
            },
        ]);

        const totalCount = inquiriesCount[0] ? inquiriesCount[0].totalCount : 0
        revalidatePath(`${clientRoutes.search}?q'`)
        return { data: JSON.parse(JSON.stringify(inqueries)), totalPages: Math.ceil(totalCount) };
    } catch (error) {
        logger(error.message);
    }
};