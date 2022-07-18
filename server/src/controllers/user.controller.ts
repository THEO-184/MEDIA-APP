import { UserDocument, UserInput } from "./../types/userTypes";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestErr, NotFound } from "../errors";
import User from "../models/user.model";
import { createUserService, findUserService } from "../services/user.services";
import { checkPermission } from "../utils/permissions";

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
	const users = await User.find().select("name email _id");

	res.status(StatusCodes.OK).json({ count: users.length, users });
};

export const getCurrentUser = async (req: Request, res: Response) => {
	const { _id } = req.user;
	const user = await User.findOne({ _id });
	if (!user) {
		throw new NotFound("no user found");
	}
	checkPermission(req.user, user);
	res.status(StatusCodes.OK).json({
		user: {
			email: user.email,
			name: user.name,
			_id: user._id,
			createdAt: user.createdAt,
		},
	});
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
	const user = await findUserService({ _id: req.params.id });
	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}
	res.status(StatusCodes.OK).json({
		user: {
			email: user.email,
			name: user.name,
			_id: user._id,
			createdAt: user.createdAt,
		},
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
	checkPermission(req.user, user);

	user.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;
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

	res.status(StatusCodes.OK).send({ msg: "update sucessfull" });
};
