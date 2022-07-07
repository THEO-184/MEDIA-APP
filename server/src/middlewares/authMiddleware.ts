import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { Unauthenticated } from "../errors";
import { UserTokenPayload } from "../types/userTypes";

export const authMiddleware: RequestHandler = async (req, res, next) => {
	const { accessToken } = req.signedCookies;

	if (!accessToken) {
		throw new Unauthenticated("user not authenticated");
	}
	try {
		const decoded = jwt.verify(
			accessToken,
			process.env.JWT_SECRET!
		) as UserTokenPayload;
		req.user = decoded;
		next();
	} catch (error) {
		throw new Unauthenticated("user not authenticated");
	}
};
