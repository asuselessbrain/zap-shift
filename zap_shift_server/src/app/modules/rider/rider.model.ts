import { model, Schema } from "mongoose";
import { IRider } from "./rider.type";

const riderSchema = new Schema<IRider>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    drivingLicenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    bikeBrandModel: {
      type: String,
      required: true,
    },
    bikeRegistrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    aboutBikerYourSelf: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export const RiderModel = model<IRider>("Rider", riderSchema);