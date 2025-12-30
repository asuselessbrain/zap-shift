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

export const UserController = {
    createUser,
};