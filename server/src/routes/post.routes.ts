import express, { Router } from "express";
import {
	createPost,
	listNewsFeed,
	postsByUser,
} from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.route("/feed").get(authMiddleware, listNewsFeed);
router.route("/by/:id").get(authMiddleware, postsByUser);
router.route("/new").post(authMiddleware, createPost);

export default router;
