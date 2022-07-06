import mongoose, { Model } from "mongoose";

declare module "express-serve-static-core" {
	interface Request {
		profile: UserInterface;
	}
}

export interface UserInterface extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserMethods {
	comparePassword(input: string): Promise<boolean>;
}

export type UserModelType = Model<UserInterface, {}, UserMethods>;
