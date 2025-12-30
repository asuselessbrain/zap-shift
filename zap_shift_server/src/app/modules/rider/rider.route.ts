import express from "express";
import { RiderController } from "./rider.controller";

const router = express.Router();

router.post("/", RiderController.createRider);

export const riderRoutes = router;