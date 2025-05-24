"use server"
import { revalidatePath } from "next/cache"
import { logger } from "@utils/log"
import { connectDb } from "@db"
import bcrypt from "bcryptjs"
import AdminUser from "@/db/models/adminUser.model"

const limitNumber = (value) => {
    const defaultLimit = value || 20
    return Math.min(defaultLimit, 100);
}

export const createAdminUser = async (userData, currentUserId) => {
    try {
        await connectDb();

        // Check if current user is admin
        const currentUser = await AdminUser.findById(currentUserId);
        if (!currentUser || currentUser.role !== 'admin') {
            throw new Error('Unauthorized access - Admin only')
        }

        // Check if email already exists
        const existingUser = await AdminUser.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email already exists')
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        
        const newUser = {
            ...userData,
            password: hashedPassword,
            createdAt: new Date()
        };

        await AdminUser.create(newUser);

        revalidatePath('/admin/users')

        return JSON.parse(JSON.stringify({ status: 'ok' }));
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify({ error: error.message }));
    }
}

export const fetchAdminUser = async (id) => {
    try {
        await connectDb();

        const user = await AdminUser.findById(id).select('-password');

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        logger(error.message)
    }
}

export const updateAdminUser = async (userData, currentUserId) => {
    try {
        await connectDb();

        // Check if current user is admin or updating own profile
        const currentUser = await AdminUser.findById(currentUserId);
        if (!currentUser || (currentUser.role !== 'admin' && currentUserId !== userData._id)) {
            throw new Error('Unauthorized access')
        }

        const userToUpdate = await AdminUser.findById(userData._id);
        if (!userToUpdate) {
            throw new Error('User not found')
        }

        // Hash password if provided
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 12);
        } else {
            delete userData.password; // Don't update password if not provided
        }

        const updatedUser = await AdminUser.findByIdAndUpdate(
            userData._id, 
            userData, 
            { new: true }
        ).select('-password');

        revalidatePath('/admin/users')

        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify({ error: error.message }));
    }
}

export const deleteAdminUser = async (id, currentUserId) => {
    try {
        await connectDb();

        // Check if current user is admin
        const currentUser = await AdminUser.findById(currentUserId);
        if (!currentUser || currentUser.role !== 'admin') {
            throw new Error('Unauthorized access - Admin only')
        }

        // Prevent self-deletion
        if (currentUserId === id) {
            throw new Error('Cannot delete your own account')
        }

        const userToDelete = await AdminUser.findById(id);
        if (!userToDelete) {
            throw new Error('User not found')
        }

        await AdminUser.deleteOne({ _id: id });

        revalidatePath('/admin/users')

        return { status: 200 };
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify({ error: error.message }));
    }
};

export const fetchAdminUsers = async ({ query, limit, skip }) => {
    try {
        await connectDb();

        const conditions = query ? {
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { role: { $regex: query, $options: 'i' } }
            ]
        } : {};

        const limitValue = limitNumber(limit);
        const skipAmount = skip || 0;

        const users = await AdminUser.find(conditions)
            .select('-password')
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limitValue);

        const usersCount = await AdminUser.countDocuments(conditions);

        return { data: JSON.parse(JSON.stringify(users)), totalPages: Math.ceil(usersCount / limitValue) }
    } catch (error) {
        logger(error.message);
    }
};

export const toggleUserStatus = async (id, currentUserId) => {
    try {
        await connectDb();

        // Check if current user is admin
        const currentUser = await AdminUser.findById(currentUserId);
        if (!currentUser || currentUser.role !== 'admin') {
            throw new Error('Unauthorized access - Admin only')
        }

        // Prevent disabling own account
        if (currentUserId === id) {
            throw new Error('Cannot disable your own account')
        }

        const user = await AdminUser.findById(id);
        if (!user) {
            throw new Error('User not found')
        }

        const updatedUser = await AdminUser.findByIdAndUpdate(
            id,
            { isActive: !user.isActive },
            { new: true }
        ).select('-password');

        revalidatePath('/admin/users')

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify({ error: error.message }));
    }
};

export const loginAdminUser = async (email, password) => {
    try {
        await connectDb();

        const user = await AdminUser.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new Error('Invalid credentials')
        }

        if (!user.isActive) {
            throw new Error('Account is disabled')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials')
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user.toObject();
        
        return JSON.parse(JSON.stringify(userWithoutPassword));
    } catch (error) {
        logger(error.message)
        return JSON.parse(JSON.stringify({ error: error.message }));
    }
};