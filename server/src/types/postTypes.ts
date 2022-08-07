import mongoose from "mongoose";
import { UserDocument } from "./userTypes";

export interface Post {
	text: string;
	photo: string;
	postedBy: string;
	created: Date;
	likes: UserDocument["_id"][];
	comments: { text: string; created: Date; postedBy: UserDocument["_id"] }[];
}

export interface PostDocument extends Post, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
