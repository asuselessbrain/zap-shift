import { Parcel } from "./parcel.type";

const createParcel = async(parcelData: Parcel): Promise<Parcel> => {
    return parcelData;
}

export const ParcelService = {
    createParcel,
};