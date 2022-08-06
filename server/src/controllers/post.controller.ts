const cloudinary: Cloudinary = require("cloudinary").v2;
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { Request, RequestHandler, Response } from "express";
import { BadRequestErr, NotFound } from "../errors";
import Post from "../models/post.model";
import User from "../models/user.model";
import { Cloudinary } from "../types/userTypes";
import { UploadedFile } from "express-fileupload";

export const listNewsFeed = async (req: Request, res: Response) => {
	const user = await User.findOne({ _id: req.user._id });
	if (!user) {
		throw new NotFound(`no user with id: ${req.user._id}`);
	}
	let following = user?.following;
	following.push(req.user._id);
	const posts = await Post.find({ postedBy: { $in: following } });
	res.status(StatusCodes.OK).json({ count: posts.length, posts });
};

export const postsByUser: RequestHandler<{ id: string }, any, any> = async (
	req,
	res
) => {
	const userPost = await Post.find({ postedBy: req.params.id });
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
		console.log("photo", imgFile);
	}
	req.body.photo = photo;
	res.status(StatusCodes.OK).json({ msg: "jsdjs" });
	// const post = await Post.create(req.body);
	// res.status(StatusCodes.OK).json({ success: true, post });
};
