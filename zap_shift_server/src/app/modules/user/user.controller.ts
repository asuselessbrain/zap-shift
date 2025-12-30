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

export const UserController = {
    createUser,
    getRole,
};