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
	about: string;
	photo: string;
	following: any[];
	followers: any[];
}

export interface UserDocument extends UserInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(input: string): Promise<boolean>;
}

type Upload = (
	path: string,
	{
		use_filename,
		folder,
	}: { use_filename: boolean; folder: "MERN-SOCIAL/Profile-photos" }
) => Object;
export interface Cloudinary {
	uploader: {
		upload: Upload;
	};
}
