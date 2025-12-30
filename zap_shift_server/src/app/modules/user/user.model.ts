import { model, Schema } from "mongoose";
import { IUser } from "./user.type";

const userSchema = new Schema<IUser>(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        photoURL: {
            type: String,
            default: "",
        },

        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        city: {
            type: String,
            trim: true,
            default: "",
        },

        postalCode: {
            type: String,
            trim: true,
            default: "",
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["admin", "user", "rider"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", userSchema);