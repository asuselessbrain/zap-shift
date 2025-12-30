import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { RiderService } from "./rider.service";

const createRider = catchAsync(async(req:Request, res:Response)=>{
    const riderData = req.body;
    const result = await RiderService.createRider(riderData);
    res.status(201).json({
        success: true,
        message: "Rider created successfully",
        data: result,
    });
})

export const RiderController = {
    createRider,
};