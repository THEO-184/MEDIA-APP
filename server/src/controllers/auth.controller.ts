import { RequestHandler } from "express";
import { expressjwt } from "express-jwt";
import { StatusCodes } from "http-status-codes";
import { BadRequestErr, Unauthenticated } from "../errors";
import User from "../models/user.model";
import { findUserService } from "../services/user.services";
import { UserInput } from "../types/userTypes";
import { attachCookies } from "../utils/jwt";

export const signIn: RequestHandler<any, any, UserInput> = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestErr("provide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new Unauthenticated("user not authenticated");
	}
	const isPasswordMatch = await user.comparePassword(password);
	if (!isPasswordMatch) {
		throw new Unauthenticated("user not authenticated");
	}

	attachCookies(res, { _id: user._id, name: user.name });
	res
		.status(StatusCodes.OK)
		.json({ user: { _id: user._id, name: user.name, email: user.email } });
};

export const signOut: RequestHandler = async (req, res) => {
	res.cookie("accessToken", "", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	res.status(StatusCodes.OK).json({ msg: "logout successful" });
};
