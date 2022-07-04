import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { UserInterface, UserMethods, UserModelType } from "../types/userTypes";

const UserSchema = new Schema<UserInterface, UserModelType, UserMethods>(
	{
		name: {
			type: String,
			trim: true,
			require: "Name is required",
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: "provide valid email",
			},
		},
		password: {
			type: String,
			required: true,
			minlength: [6, "password must be atleast 6 characters"],
		},
	},
	{ timestamps: true }
);

const User = model<UserInterface>("User", UserSchema);

UserSchema.method(
	"comparePassword",
	function comparePassword(password: string) {
		let user = this as UserInterface;
		const isMatched = bcrypt.compare(password, user.password);
		return isMatched;
	}
);

export default User;
