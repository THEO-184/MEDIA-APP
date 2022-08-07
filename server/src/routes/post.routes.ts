import { Router } from "express";
import {
	createPost,
	deletePost,
	likePost,
	listNewsFeed,
	postsByUser,
	unLikePost,
	commentOnPost,
} from "../controllers/post.controller";

const router = Router();

router.route("/feed").get(listNewsFeed);
router.route("/new").post(createPost);
router.route("/like").put(likePost);
router.route("/unlike").put(unLikePost);
router.route("/comment").put(commentOnPost);
router.route("/:postId").delete(deletePost);
router.route("/by/:id").get(postsByUser);

export default router;
