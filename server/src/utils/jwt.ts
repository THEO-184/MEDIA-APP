import { UserDocument, UserTokenPayload } from "../types/userTypes";
import jwt from "jsonwebtoken";
import { Response } from "express";

export const createJWT = (payload: UserTokenPayload) => {
	const secret = process.env.JWT_SECRET!;
	const token = jwt.sign(payload, secret);
	return token;
};

export const attachCookies = (res: Response, payload: UserTokenPayload) => {
	const accessToken = createJWT(payload);
	const tenHours = 1000 * 60 * 60 * 10;
	res.cookie("accessToken", accessToken, {
		signed: true,
		expires: new Date(Date.now() + tenHours),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
};
