const cloudinary: Cloudinary = require("cloudinary").v2;
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { Request, RequestHandler, Response } from "express";
import { BadRequestErr, NotFound } from "../errors";
import Post from "../models/post.model";
import User from "../models/user.model";
import { Cloudinary } from "../types/userTypes";
import { UploadedFile } from "express-fileupload";
import { checkPermission } from "../utils/permissions";
import { Post as PostType } from "../types/postTypes";

export const listNewsFeed = async (req: Request, res: Response) => {
	const user = await User.findOne({ _id: req.user._id });

	if (!user) {
		throw new NotFound(`no user with id: ${req.user._id}`);
	}
	let following = user?.following;
	following.push(req.user._id);
	const posts = await Post.find({ postedBy: { $in: following } })
		.populate("postedBy", "name")
		.populate("likes", "name")
		.populate("comments.postedBy", "name");
	res.status(StatusCodes.OK).json({ count: posts.length, posts });
};

export const postsByUser: RequestHandler<{ id: string }, any, any> = async (
	req,
	res
) => {
	const userPost = await Post.find({ postedBy: req.params.id })
		.populate("postedBy", "name")
		.populate("likes", "name")
		.populate("comments.postedBy", "name");
	if (!userPost) {
		throw new NotFound(`no user found with id: ${req.params.id}`);
	}
	res.status(StatusCodes.OK).json({ count: userPost.length, posts: userPost });
};

export const createPost = async (req: Request, res: Response) => {
	req.body.postedBy = req.user._id;
	let photo = "";
	if (req.files) {
		const postImage = req.files.image as UploadedFile;
		// check file type
		if (!postImage.mimetype.startsWith("image")) {
			throw new BadRequestErr("please upload an image file");
		}
		const imgFile = await cloudinary.uploader.upload(postImage.tempFilePath, {
			use_filename: true,
			folder: "MERN-SOCIAL/posts-photos",
		});
		photo = imgFile.secure_url;
		fs.unlinkSync(postImage.tempFilePath);
		req.body.photo = photo;
	}

	const post = await Post.create(req.body);
	res.status(StatusCodes.CREATED).json({ success: true, post });
};

export const deletePost = async (
	req: Request<{ postId: string }, any, any>,
	res: Response
) => {
	const post = await Post.findOne({ _id: req.params.postId });
	if (!post) {
		throw new NotFound(`no post found with id: ${req.params.postId}`);
	}
	checkPermission(req.user, post.postedBy);
	await Post.remove();
	res.status(StatusCodes.OK).json({ msg: "post successfully deleted" });
};

export const likePost = async (
	req: Request<any, any, { id: string }>,
	res: Response
) => {
	const post = await Post.findOneAndUpdate(
		{ _id: req.body.id },
		{ $addToSet: { likes: req.user._id } },
		{ new: true, runValidators: true }
	)
		.populate("postedBy", "name")
		.populate("likes", "name")
		.populate("comments.postedBy", "name");
	if (!post) {
		throw new NotFound(`no post found with id: ${req.body.id}`);
	}

	res.status(StatusCodes.OK).json({ post });
};

export const unLikePost = async (
	req: Request<any, any, { id: string }>,
	res: Response
) => {
	const post = await Post.findOneAndUpdate(
		{ _id: req.body.id },
		{ $pull: { likes: req.user._id } },
		{ new: true, runValidators: true }
	)
		.populate("postedBy", "name")
		.populate("likes", "name")
		.populate("comments.postedBy", "name");

	if (!post) {
		throw new NotFound(`no post found with id: ${req.body.id}`);
	}

	res.status(StatusCodes.OK).json({ post });
};

export const commentOnPost = async (
	req: Request<any, any, { id: string; comment: PostType["comments"][number] }>,
	res: Response
) => {
	let comment = req.body.comment;
	comment.postedBy = req.user._id;
	const post = await Post.findOneAndUpdate(
		{ _id: req.body.id },
		{ $push: { comments: comment } },
		{ new: true, runValidators: true }
	)
		.populate("postedBy", "name")
		.populate("likes", "name")
		.populate("comments.postedBy", "name");

	if (!post) {
		throw new NotFound(`no post found with id: ${req.body.id}`);
	}

	res.status(StatusCodes.OK).json({ post });
};
