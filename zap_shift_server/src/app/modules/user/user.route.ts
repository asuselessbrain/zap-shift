import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser)
router.get("/role/:email", UserController.getRole)
router.get("/", UserController.getAllUsers)
router.patch("/role/:email", UserController.updateUserRole)
router.get("/riders", UserController.getRiders)

export const userRoutes = router;