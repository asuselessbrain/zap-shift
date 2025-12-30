import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser)
router.get("/role/:email", UserController.getRole)
router.get("/", UserController.getAllUsers)

export const userRoutes = router;