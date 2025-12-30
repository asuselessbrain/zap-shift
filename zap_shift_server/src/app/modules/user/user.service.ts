import { User } from "./user.model"
import { IUser } from "./user.type"

const createUser = async(userData: IUser): Promise<IUser> => {
    userData.role = "user";
    const result = await User.create(userData)
    return result
}

export const UserService = {
    createUser,
}