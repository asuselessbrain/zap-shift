import express from "express";
import { ParcelController } from "./parcel.controller";

const router = express.Router();

router.post('/', ParcelController.createParcel)
router.get('/', ParcelController.getAllParcels)

export const ParcelRouter = router;