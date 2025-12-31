import express from "express";
import { ParcelController } from "./parcel.controller";

const router = express.Router();

router.post('/', ParcelController.createParcel)
router.get('/', ParcelController.getAllParcels)
router.get('/manage-parcel-card-data', ParcelController.getManageParcelPageCardData)

export const ParcelRouter = router;