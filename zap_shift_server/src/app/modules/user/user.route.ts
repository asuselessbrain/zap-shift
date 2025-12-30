import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser)
router.get("/role/:email", UserController.getRole)

export const userRoutes = router;