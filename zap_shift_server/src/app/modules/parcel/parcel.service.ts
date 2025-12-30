import { ParcelModel } from "./parcel.model";
import { Parcel } from "./parcel.type";

const createParcel = async (parcelData: Parcel) => {
    const result = await ParcelModel.create(parcelData);
    return result;
}

const getAllParcels = async (query: Record<string, any>) => {
    console.log(query.parcelType)

    const filter: any = {};

    if (query.parcelType) {
        filter.parcelType = query.parcelType;
    }

    if (query.senderDistrict) {
        filter.senderDistrict = query.senderDistrict
    }

    if (query.receiverDistrict) {
        filter.receiverDistrict = query.receiverDistrict
    }

    if (query.status) {
        filter.status = query.status;
    }

    if (query.searchTerm) {
        filter.$or = [
            { senderName: { $regex: query.searchTerm, $options: "i" } },
            { receiverName: { $regex: query.searchTerm, $options: "i" } },
            { parcelName: { $regex: query.searchTerm, $options: "i" } },
            { senderDistrict: { $regex: query.searchTerm, $options: "i" } },
            { receiverDistrict: { $regex: query.searchTerm, $options: "i" } },
            { senderRegion: { $regex: query.searchTerm, $options: "i" } },
            { receiverRegion: { $regex: query.searchTerm, $options: "i" } },
        ]
    }

    const sortOption: any = {};

    if (query.sortBy && query.sortOrder) {
        sortOption[String(query.sortBy)] = query.sortOrder === "asc" ? 1 : -1;
    }

    const skip = (Number(query.skip) - 1) * Number(query.limit) || 0;
    const limit = Number(query.limit) || 10;


    const parcels = await ParcelModel.find(filter).sort(sortOption).skip(skip).limit(limit);
    return parcels;
}

export const ParcelService = {
    createParcel,
    getAllParcels,
};