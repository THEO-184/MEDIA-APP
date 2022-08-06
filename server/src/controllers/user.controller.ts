const cloudinary: Cloudinary = require("cloudinary").v2;
import { Cloudinary, UserDocument, UserInput } from "./../types/userTypes";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestErr, NotFound } from "../errors";
import User from "../models/user.model";
import { createUserService, findUserService } from "../services/user.services";
import { checkPermission } from "../utils/permissions";
import { UploadedFile } from "express-fileupload";

export const createUser: RequestHandler<any, any, UserDocument> = async (
	req,
	res
) => {
	const user = await createUserService(req.body);
	const { name, email, _id, createdAt } = user;

	res
		.status(StatusCodes.CREATED)
		.json({ status: true, user: { name, email, _id, createdAt } });
};

export const getAllUsers: RequestHandler = async (req, res) => {
	const users = await User.find().select("-password -__v").sort("createdAt");

	res.status(StatusCodes.OK).json({ count: users.length, users });
};

export const getCurrentUser = async (req: Request, res: Response) => {
	const { _id } = req.user;
	const user = await User.findOne({ _id })
		.select("-password -__v")
		.populate("following", "_id name photo")
		.populate("followers", "_id name photo");
	if (!user) {
		throw new NotFound("no user found");
	}

	checkPermission(req.user, user);
	res.status(StatusCodes.OK).json({
		user,
	});
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
	const user = await findUserService({ _id: req.params.id });
	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}
	res.status(StatusCodes.OK).json({
		user,
	});
};

export const updateUser: RequestHandler<
	{ id: string },
	any,
	UserInput
> = async (req, res) => {
	let user = await User.findOne({ _id: req.params.id });
	const { email, name, password } = req.body;

	if (!email || !password || !name) {
		throw new BadRequestErr("provide details to be updated");
	}
	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}

	if (req.files) {
		const userProfile = req.files!.image as UploadedFile;
		// check file type
		if (!userProfile.mimetype.startsWith("image")) {
			throw new BadRequestErr("file type should be image");
		}
		// check file size
		const maxSize = 1024 * 1024; // extract data fom form
		// if (maxSize > userProfile.size) {
		// 	throw new BadRequestErr("image size should be atmost 1kb");
		// }
		const imgFile: any = await cloudinary.uploader.upload(
			userProfile.tempFilePath,
			{
				use_filename: true,
				folder: "MERN-SOCIAL/Profile-photos",
			}
		);
		user.photo = imgFile.secure_url;
	}

	checkPermission(req.user, user);

	user.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;
	user.about = req.body.about;
	await user.save();

	res
		.status(StatusCodes.OK)
		.send({ msg: `user with id:${req.params.id} succesfully updated` });
};

export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
	let user = await User.findOne({ _id: req.params.id });

	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}
	checkPermission(req.user, user);

	await user.remove();

	res.status(StatusCodes.OK).send({ msg: "delete sucessfull" });
};

export const addFollowing = async (
	req: Request<any, any, { id: string }>,
	res: Response,
	next: NextFunction
) => {
	await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: { following: req.body.id } }
	);
	next();
};

export const addFollower = async (
	req: Request<any, any, { id: string }>,
	res: Response
) => {
	const user = await User.findOneAndUpdate(
		{ _id: req.body.id },
		{ $push: { followers: req.user._id } },
		{ new: true, runValidators: true }
	)
		.select("-password -__v")
		.populate("followers", "_id name photo")
		.populate("following", "_id name photo");
	if (!user) {
		throw new NotFound(`no user forund with id: ${req.body.id}`);
	}

	res.status(StatusCodes.OK).json({ status: true, user });
};

export const removeFollowing = async (
	req: Request<any, any, { id: any }>,
	res: Response,
	next: NextFunction
) => {
	await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $pull: { following: req.body.id } }
	);
	next();
};

export const removeFollower = async (
	req: Request<any, any, { id: string }>,
	res: Response
) => {
	const user = await User.findOneAndUpdate(
		{ _id: req.body.id },
		{ $pull: { followers: req.user._id } },
		{ new: true, runValidators: true }
	)
		.select("-password -__v")
		.populate("followers", "_id name photo")
		.populate("following", "_id name photo");
	if (!user) {
		throw new NotFound(`no user forund with id: ${req.body.id}`);
	}

	res.status(StatusCodes.OK).json({ status: true, user });
};

export const findPeopleToFollow = async (req: Request, res: Response) => {
	const user = await User.findOne({ _id: req.user._id });
	if (!user) {
		throw new NotFound(`no user found with id : ${req.user._id}`);
	}
	let following = user.following;
	following.push(req.user._id);

	const usersToFollow = await User.find({ _id: { $nin: following } }).select(
		"name photo"
	);

	res
		.status(StatusCodes.OK)
		.json({ count: usersToFollow.length, users: usersToFollow });
};
