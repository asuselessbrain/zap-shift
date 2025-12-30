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

const getRole = async(email: string): Promise<{role: string} | null> => {
    const user = await User.findOne({ email }).select("role -_id");
    return user;
}

export const UserService = {
    createUser,
    getRole,
}