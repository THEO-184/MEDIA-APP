import express, { Router } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getCurrentUser,
	getUserById,
	updateUser,
} from "./../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.route("/").get(getAllUsers).post(createUser);

router
	.route("/:id")
	.get(authMiddleware, getCurrentUser)
	.put(authMiddleware, updateUser)
	.delete(authMiddleware, deleteUser);
router.param("id", getUserById);

export default router;
