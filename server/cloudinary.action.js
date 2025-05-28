"use server";

import { handleError } from "@/utils";
import { v2 as cloudinary } from "cloudinary";

export const deleteCloudinaryImg = async (img_id) => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
    secure: true,
  });
  try {
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(img_id);

    return;
  } catch (error) {
    handleError(error.message);
  }
};
