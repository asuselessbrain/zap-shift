import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { RiderService } from "./rider.service";

const createRider = catchAsync(async (req: Request, res: Response) => {
    const riderData = req.body;
    const result = await RiderService.createRider(riderData);
    res.status(201).json({
        success: true,
        message: "Rider created successfully",
        data: result,
    });
})

const getAllRiders = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await RiderService.getAllRiders(query as Record<string, any>);
    res.status(200).json({
        success: true,
        message: "Riders retrieved successfully",
        data: result,
    });
});

const riderRelatedDashboardData = catchAsync(async (req: Request, res: Response) => {
    const result = await RiderService.riderRelatedDashboardData();
    res.status(200).json({
        success: true,
        message: "Rider related dashboard data retrieved successfully",
        data: result,
    });
});

const changeRiderStatus = catchAsync(async (req: Request, res: Response) => {
    const riderId = req.params.riderId;
    const { status } = req.body;

    const result = await RiderService.changeRiderStatus(riderId as string, status);
    res.status(200).json({
        success: true,
        message: `Rider status updated to ${status} successfully`,
        data: result,
    });
});

export const RiderController = {
    createRider,
    getAllRiders,
    riderRelatedDashboardData,
    changeRiderStatus
};