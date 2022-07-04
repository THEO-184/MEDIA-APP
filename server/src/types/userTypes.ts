import mongoose, { Model } from "mongoose";

export interface UserInterface extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

export interface UserMethods {
	comparePassword(input: string): Promise<boolean>;
}

export type UserModelType = Model<UserInterface, {}, UserMethods>;
