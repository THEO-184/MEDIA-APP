import { UserDocument } from "./../types/userTypes";
import User from "../models/user.model";
import { DocumentDefinition, FilterQuery } from "mongoose";

export const createUserService = (input: DocumentDefinition<UserDocument>) => {
	return User.create(input);
};

export const findUserService = (filter: FilterQuery<UserDocument>) => {
	return User.findOne(filter)
		.select("-password -__v")
		.populate("following", "name _id")
		.populate("followers", "name _id");
};
