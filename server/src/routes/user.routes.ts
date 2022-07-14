import express, { Router } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	getCurrentUser,
	updateUser,
} from "./../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/showMe").get(authMiddleware, getCurrentUser);

router
	.route("/:id")
	.get(authMiddleware, getUserById)
	.put(authMiddleware, updateUser)
	.delete(authMiddleware, deleteUser);

export default router;
