import { SortOrder } from "mongoose";
import { User } from "./user.model"
import { IUser } from "./user.type"

const createUser = async (userData: IUser): Promise<IUser> => {
    userData.role = "user";
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        const result = await User.create(userData)
        return result
    }
    return null as unknown as IUser
}

const getRole = async (email: string): Promise<{ role: string } | null> => {
    const user = await User.findOne({ email }).select("role -_id");
    return user;
}

const getAllUsers = async (query: Record<string, unknown>): Promise<{
    data: IUser[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}> => {
    const filter: Record<string, unknown> = {};

    if (query.role) {
        filter.role = query.role;
    }

    if (query.city) {
        filter.city = query.city;
    }

    if (query.searchTerm) {
        filter.$or = [
            { displayName: { $regex: query.searchTerm, $options: "i" } },
            { email: { $regex: query.searchTerm, $options: "i" } },
            { address: { $regex: query.searchTerm, $options: "i" } },
            { city: { $regex: query.searchTerm, $options: "i" } },
        ]
    }

    const sort: Record<string, SortOrder> = {}

    if (query.sortBy && query.sortOrder) {
        sort[String(query.sortBy)] = query.sortOrder === "asc" ? 1 : -1;
    }

    const limit = Number(query.limit) || 10;

    const skip = (Number(query.skip) - 1) * Number(query.limit || limit) || 0;

    const users = await User.find(filter).sort(sort).skip(skip).limit(limit).select("-password");

    const total = await User.countDocuments(filter);
    return {
        meta: {
            total,
            page: (Number(skip) / Number(limit)) + 1,
            limit,
        },
        data: users
    };
}

const updateUserRole = async (email: string, role: string): Promise<IUser | null> => {
    const updatedUser = await User.findOneAndUpdate({ email }, { role }, { new: true }).select("-password");
    return updatedUser;
}

export const UserService = {
    createUser,
    getRole,
    getAllUsers,
    updateUserRole
}