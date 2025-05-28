"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "@/db";
import { logger } from "@/utils/log";
import Newsletter from "@/db/models/newsLetter.model";

const limitNumber = (value) => {
  const maxNumber = 20;
  const defaultLimit = value || 1;
  return Math.min(defaultLimit, maxNumber);
};

export const createNewsletterSubscriber = async (email) => {
  try {
    await connectDb();

    await Newsletter.create({ email });

    revalidatePath("/");

    return JSON.parse(JSON.stringify({ status: "ok" }));
  } catch (error) {
    logger(error.message);
    return JSON.parse(JSON.stringify("Something went wrong"));
  }
};

export const fetchNewsletterSubscribers = async ({
  query,
  limit,
  skip,
  isSitemap,
}) => {
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

    const newsletters = await Newsletter.find(conditions)
      .sort({ receivedAt: "desc" })
      .skip(skipAmount)
      .limit(limitValue);

    const newsletterCount = await Newsletter.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(newsletters)),
      totalPages: Math.ceil(newsletterCount),
    };
  } catch (error) {
    logger(error.message);
  }
};
