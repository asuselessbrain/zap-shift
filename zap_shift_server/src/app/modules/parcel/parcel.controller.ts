import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ParcelService } from "./parcel.service";

const createParcel = catchAsync(async(req: Request, res: Response)=>{
    const parcelData = req.body;

    const result = await ParcelService.createParcel(parcelData)

    res.status(201).json({
        success: true,
        message: "Parcel created successfully",
        data: result,
    });
})

const getAllParcels = catchAsync(async(req: Request, res: Response)=>{
    const query = req.query;
    const parcels = await ParcelService.getAllParcels(query);

    res.status(200).json({
        success: true,
        message: "Parcels retrieved successfully",
        data: parcels,
    });
});

export const ParcelController = {
    createParcel,
    getAllParcels,
};