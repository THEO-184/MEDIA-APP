import mongoose, { Schema, model } from "mongoose";
import { PostDocument } from "../types/postTypes";

const PostSchema = new Schema({
	text: {
		type: String,
		required: "Text is required",
	},
	photo: {
		type: String,
		default: "",
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	created: {
		type: Date,
		default: Date.now,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	comments: [
		{
			text: String,
			created: { type: Date, default: Date.now },
			postedBy: { type: mongoose.Schema.Types.ObjectId },
		},
	],
});

const Post = model<PostDocument>("Post", PostSchema);

export default Post;
