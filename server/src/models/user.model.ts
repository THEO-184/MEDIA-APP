import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { UserDocument, UserInput } from "../types/userTypes";

const UserSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minlength: [3, "name must be atleast characters"],
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

UserSchema.pre("save", async function (next) {
	let user = this as UserDocument;
	if (!user.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	return next();
});

UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	let user = this as UserDocument;
	const isMatch = bcrypt.compare(password, user.password);
	return isMatch;
};

const User = model<UserDocument>("User", UserSchema);
export default User;
