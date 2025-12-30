import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";

const createUser = catchAsync(async(req:Request, res:Response)=>{
    const userData = req.body;
    const result = await UserService.createUser(userData)

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
})

const getRole = catchAsync(async(req:Request, res:Response)=>{
    const email = req.params.email;

    const result = await UserService.getRole(email as string);

    res.status(200).json({
        success: true,
        message: "User role retrieved successfully",
        data: result,
    });
})

const getAllUsers = catchAsync(async(req:Request, res:Response)=>{
    const query = req.query;

    const result = await UserService.getAllUsers(query as Record<string, unknown>);

    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
})

const updateUserRole = catchAsync(async(req:Request, res:Response)=>{
    const email = req.params.email;
    const { role } = req.body;

    const result = await UserService.updateUserRole(email as string, role);
    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: result,
    });
});

const getRiders = catchAsync(async(req:Request, res:Response)=>{
    const query = req.query;

    const result = await UserService.getRiders(query as Record<string, unknown>);

    res.status(200).json({
        success: true,
        message: "Riders retrieved successfully",
        data: result,
    });
});

export const UserController = {
    createUser,
    getRole,
    getAllUsers,
    updateUserRole,
    getRiders,
};