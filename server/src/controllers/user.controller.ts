import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestErr, NotFound } from "../errors";
import User from "../models/user.model";
import { UserInterface } from "../types/userTypes";

export const createUser: RequestHandler<any, any, UserInterface> = async (
	req,
	res
) => {
	const user = await User.create(req.body);

	res.status(StatusCodes.CREATED).json({ status: true, user });
};

export const getAllUsers: RequestHandler = async (req, res) => {
	const users = await User.find().select("-password");

	res.status(StatusCodes.OK).json({ count: users.length, users });
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string
) => {
	const user = await User.findOne({ _id: id });

	if (!user) {
		throw new NotFound(`no user with id : ${id} was found`);
	}
	req.profile = user;
	next();
};

export const getCurrentUser: RequestHandler<{ id: string }> = async (
	req,
	res
) => {
	const { email, name, createdAt, updatedAt } = req.profile;

	const user = await User.findOne({ _id: req.params.id });

	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}
	res
		.status(StatusCodes.OK)
		.json({ user: { email, name, createdAt, updatedAt } });
};

export const updateUser: RequestHandler<
	{ id: string },
	any,
	{ name: string }
> = async (req, res) => {
	let user = await User.findOne({ _id: req.params.id });

	if (!req.body.name) {
		throw new BadRequestErr("provide details ti be updated");
	}

	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}

	user.name = req.body.name;
	await user.save();

	res.status(StatusCodes.OK).send({ msg: `user with id:${req.params.id} ` });
};

export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
	let user = await User.findOne({ _id: req.params.id });

	if (!user) {
		throw new NotFound(`no user with id : ${req.params.id} was found`);
	}

	await user.remove();

	res.status(StatusCodes.OK).send({ msg: "update sucessfull" });
};
