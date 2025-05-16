import { formatDate } from './helpers/formatDate';
import { handleNativeSharing, } from './helpers/newsCardHelpers';
import striptags from "striptags";
import * as Yup from 'yup';
import { logger } from './log';
import { seoMetaData_categories } from '@lib/seo/meta_data';

const slugify = (content) => {
    return content.toLowerCase().replace(/\s+/g, "-")
}
const countWords = (content) => {
    // Remove extra white spaces and line breaks
    const cleanedContent = content?.replace(/\s+/g, " ").trim();
    const words = cleanedContent?.split(" ");

    // Filter out empty words (e.g., multiple white spaces)
    const filteredWords = words?.filter((word) => word !== "");

    return filteredWords?.length;
};

export const readingTime = (content) => {
    const strippedText = striptags(content);
    const wordsPerMinute = 200;

    const words = countWords(strippedText);
    const time = Math.ceil(words / wordsPerMinute);

    return time;
};

export const handleError = (error) => {
    console.error('Error ---->', error);

    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export const articleValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    image: Yup.string().url('Invalid URL format for Image').required('Image URL is required'),
    image_id: Yup.string().required('Image ID is required'),
    content: Yup.string().required('Content is required'),
    summary: Yup.string().required('Summary is required'),
    category: Yup.string().required('Category is required'),
    imgSrc: Yup.string().required('Image source is required'),
    imgSrcLink: Yup.string().required('Image source LINK is required'),
    newsSrc: Yup.string().required('News source is required'),
    newsSrcLink: Yup.string().required('News source LINK is required'),
    tags: Yup.array().of(Yup.string()).required('At least one tag is required'),
});

export const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    tel: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
        .required('Phone number is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

export const newsletterValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

export const contactMeValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string()
        .required('Message is required')
        .min(6, 'Message should contain more than 5 characters'),
    tel: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});


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
}

export const authorizedUsers = ['admin', 'creator', 'editor', 'moderator']
export const isUserAuthorized = (userRoles) => {
    // Ensure userType is an array
    if (!Array.isArray(userRoles)) {
        userRoles = [userRoles];
    }

    // Check if the user has at least one authorized userType
    return userRoles.some(role => authorizedUsers.includes(role));
};

const MAX_FILE_SIZE = 99 * 1024; // 99KB in bytes
export const isFileSizeValid = (size) => {
    if (size > MAX_FILE_SIZE) {
        logger("File size exceeds 99KB.")
        return false; // Prevent the upload
    }
    return true;  // Continue with the upload
};
export const convertImageToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const getCategoryMetadata = (category, isFact) => {
    return seoMetaData_categories.find(seoData => {
        return category === seoData.category_id && `/${isFact ? `facts/categories/${category}` : category}` === seoData.path;
    })
}

export {
    slugify,
    formatDate,
    handleNativeSharing,
}