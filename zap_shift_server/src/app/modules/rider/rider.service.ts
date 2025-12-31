import { User } from "../user/user.model";
import { RiderModel } from "./rider.model";
import { IRider } from "./rider.type";

const createRider = async (riderData: IRider): Promise<IRider> => {
    riderData.status = "pending";
    const isUserExist = await User.findOne({ email: riderData.email });
    if (!isUserExist) {
        throw new Error("User with this email does not exist");
    }

    if (isUserExist.role === "rider") {
        throw new Error("User is already registered as a rider");
    }

    if (isUserExist.displayName !== riderData.name) {
        await User.updateOne({ email: riderData.email }, { displayName: riderData.name });
    }
    const newRider = await RiderModel.create(riderData);
    return newRider;
}

const getAllRiders = async (query: Record<string, any>): Promise<{ meta: { total: number, page: number, limit: number }, data: IRider[] }> => {
    const filter: Record<string, any> = {};

    if (query.status) {
        filter.status = query.status;
    }

    if (query.city) {
        filter.district = query.city;
    }

    if (query.region) {
        filter.region = query.region;
    }

    const sort: Record<string, any> = {};

    if (query.sortBy && query.sortOrder) {
        sort[String(query.sortBy)] = query.sortOrder === "asc" ? 1 : -1;
    }

    if (query.searchTerm) {
        filter.$or = [
            { name: { $regex: query.searchTerm, $options: "i" } },
            { email: { $regex: query.searchTerm, $options: "i" } },
            { district: { $regex: query.searchTerm, $options: "i" } },
            { region: { $regex: query.searchTerm, $options: "i" } },
            { bikeBrandModel: { $regex: query.searchTerm, $options: "i" } },
        ]
    }

    const limit = Number(query.limit) || 10;
    const skip = (Number(query.skip) - 1) * Number(query.limit || limit) || 0;

    const riders = await RiderModel.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await RiderModel.countDocuments(filter);
    return {
        meta: {
            total,
            page: (Number(skip) / Number(limit)) + 1,
            limit,
        },
        data: riders
    }
};

const riderRelatedDashboardData = async (): Promise<{ acceptedRiders: number, pendingRiders: number, rejectedRiders: number }> => {
    const acceptedRiders = await RiderModel.countDocuments({ status: 'approved' });
    const pendingRiders = await RiderModel.countDocuments({ status: 'pending' });
    const rejectedRiders = await RiderModel.countDocuments({ status: 'rejected' });

    return {
        acceptedRiders,
        pendingRiders,
        rejectedRiders
    }
}

const changeRiderStatus = async (riderId: string, status: 'approved' | 'rejected'): Promise<IRider | null> => {
    const rider = await RiderModel.findById(riderId);
    if (!rider) {
        throw new Error("Rider not found");
    }

    if(status === 'approved'){
        await User.updateOne({ email: rider.email }, { role: 'rider' });
    }
    rider.status = status;
    await rider.save();
    return rider;
}

export const RiderService = {
    createRider,
    getAllRiders,
    riderRelatedDashboardData,
    changeRiderStatus
};