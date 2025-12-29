import express from "express";
import { ParcelController } from "./parcel.controller";

const router = express.Router();

router.post('/', ParcelController.createParcel)

export const ParcelRouter = router;