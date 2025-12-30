import { User } from "../user/user.model";
import { RiderModel } from "./rider.model";
import { IRider } from "./rider.type";

const createRider = async (riderData: IRider): Promise<IRider> => {
    riderData.status = "pending";
    const isUserExist = await User.findOne({ email: riderData.email });
    if (!isUserExist) {
        throw new Error("User with this email does not exist");
    }

    if(isUserExist.role === "rider") {
        throw new Error("User is already registered as a rider");
    }

    if(isUserExist.displayName !== riderData.name) {
        await User.updateOne({ email: riderData.email }, { displayName: riderData.name });
    }
    const newRider = await RiderModel.create(riderData);
    return newRider;
}

export const RiderService = {
    createRider,
};