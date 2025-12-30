import express from "express";
import { RiderController } from "./rider.controller";

const router = express.Router();

router.post("/", RiderController.createRider);
router.get("/", RiderController.getAllRiders);
router.get("/dashboard-data", RiderController.riderRelatedDashboardData);
router.patch("/:riderId/status", RiderController.changeRiderStatus);

export const riderRoutes = router;