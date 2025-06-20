import { logger } from "./log";

const slugify = (content) => {
  return content.toLowerCase().replace(/\s+/g, "-");
};

export const handleError = (error) => {
  console.error("Error ---->", error);

  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const validateUser = (userData, confirmPassword) => {
  const mailformat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (userData.firstName.length === 0) {
    return "firstName is required.";
  }
  if (userData.lastName.length === 0) {
    return "lastName is required.";
  }

  if (!userData.email.match(mailformat)) {
    return "Invalid email format.";
  }

  if (userData.password.length === 0) {
    return "Password is required.";
  }

  if (userData.password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null; // If no errors are found, return null indicating successful validation.
};

const MAX_FILE_SIZE = 99 * 1024; // 99KB in bytes
export const isFileSizeValid = (size) => {
  if (size > MAX_FILE_SIZE) {
    logger("File size exceeds 99KB.");
    return false; // Prevent the upload
  }
  return true; // Continue with the upload
};
export const convertImageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export { slugify };
