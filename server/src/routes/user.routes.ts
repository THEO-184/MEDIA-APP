import express, { Router } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getCurrentUser,
	getUserById,
	updateUser,
} from "./../controllers/user.controller";

const router = Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getCurrentUser).put(updateUser).delete(deleteUser);
router.param("id", getUserById);

export default router;
