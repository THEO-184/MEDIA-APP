import mongoose, { Model } from "mongoose";

declare module "express-serve-static-core" {
	interface Request {
		user: UserTokenPayload;
	}
}

export interface UserTokenPayload {
	name: string;
	_id: UserDocument["_id"];
}

export interface UserInput {
	name: string;
	email: string;
	password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(input: string): Promise<boolean>;
}
