import { handleError } from "@/utils";
import { CLOUD_ENDPOINT } from "./routes";

export const uploadImageToCloud = async (images) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const CLOUD_PRESET = process.env.NEXT_PUBLIC_CLOUD_PRESET;

  try {
    if (!images || images.length === 0) {
      throw new Error("No images provided for upload");
    }

    const uploadPromises = images.map(async (image) => {
      const data = new FormData();
      data.append("file", image.base64String);
      data.append("upload_preset", CLOUD_PRESET);
      data.append("cloud_name", CLOUD_NAME);
      data.append("folder", "makayla_rooms");

      const res = await fetch(CLOUD_ENDPOINT, {
        method: "POST",
        body: data,
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error(`Upload failed for image: ${image.name}`);
      }

      const result = await res.json();
      return {
        image: result.secure_url,
        image_id: result.public_id,
        originalName: image.name,
      };
    });

    const uploadResults = await Promise.all(uploadPromises);
    
    return {
      success: true,
      images: uploadResults,
    };
  } catch (error) {
    handleError(error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};
