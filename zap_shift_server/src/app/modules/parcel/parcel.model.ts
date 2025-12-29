import { Schema, model } from "mongoose";

const ParcelSchema = new Schema(
  {
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
      validate: {
        validator: function (this: any, value: number) {
          // weight required only for non-document
          if (this.parcelType === "non-document") {
            return value !== undefined;
          }
          return true;
        },
        message: "Weight is required for non-document parcels",
      },
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
  },
  {
    timestamps: true,
  }
);

export const ParcelModel = model("Parcel", ParcelSchema);
