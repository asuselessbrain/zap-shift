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

export const UserService = {
    createUser,
}