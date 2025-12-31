import { Schema, Types, model } from "mongoose";

const ParcelSchema = new Schema(
  {
    riderId: {
      type: Types.ObjectId,
      ref: "RiderModel",
      default: null,
    },
    parcelType: {
      type: String,
      enum: ["document", "non-document"],
      required: [true, "Parcel type is required"],
    },

    parcelName: {
      type: String,
      required: [true, "Parcel name is required"],
      trim: true,
      minlength: [3, "Parcel name must be at least 3 characters"],
    },

    weight: {
      type: Number,
      min: [0.1, "Weight must be greater than 0"],
      required: [true, "Weight is required"],
    },

    cost: {
      type: Number,
      min: [0, "Cost cannot be negative"],
      required: [true, "Cost is required"],
    },

    // Sender Info
    senderName: {
      type: String,
      required: [true, "Sender name is required"],
      trim: true,
    },

    senderEmail: {
      type: String,
      required: [true, "Sender email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid sender email address"],
    },

    senderRegion: {
      type: String,
      required: [true, "Sender region is required"],
    },

    senderDistrict: {
      type: String,
      required: [true, "Sender district is required"],
    },

    senderPhoneNumber: {
      type: String,
      required: [true, "Sender phone number is required"],
      match: [/^(?:\+88|01)?\d{9}$/, "Invalid Bangladeshi phone number"],
    },

    pickupInstruction: {
      type: String,
      trim: true,
      maxlength: [300, "Pickup instruction too long"],
    },

    // Receiver Info
    receiverName: {
      type: String,
      required: [true, "Receiver name is required"],
      trim: true,
    },

    receiverEmail: {
      type: String,
      required: [true, "Receiver email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid receiver email address"],
    },

    receiverRegion: {
      type: String,
      required: [true, "Receiver region is required"],
    },

    receiverDistrict: {
      type: String,
      required: [true, "Receiver district is required"],
    },

    receiverPhoneNumber: {
      type: String,
      required: [true, "Receiver phone number is required"],
      match: [/^(?:\+88|01)?\d{9}$/, "Invalid Bangladeshi phone number"],
    },

    deliveryInstruction: {
      type: String,
      trim: true,
      maxlength: [300, "Delivery instruction too long"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "ready-for-rider-assignment",
        "rider-assigned",
        "in-transit",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

export const ParcelModel = model("Parcel", ParcelSchema);
