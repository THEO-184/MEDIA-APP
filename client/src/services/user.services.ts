import { generatePath } from "react-router-dom";
import api from "../common/queries/api-user";
import {
	CreatedUser,
	CreateUser,
	CreateUserProps,
	FetchUsers,
	User,
} from "../common/interfaces/api-interfaces";
import { SignInProps } from "../common/interfaces/auth.interface";

export const FetchAllUsers = async (): Promise<FetchUsers> => {
	const res = await api.get("/users");
	return res?.data;
};

export const createUser = async (
	data: CreateUserProps
): Promise<CreateUser> => {
	const res = await api.post("/users", data);
	return res?.data;
};

export const loginUser = async (data: SignInProps): Promise<CreateUser> => {
	const res = await api.post("/auth/signin", data);
	return res.data;
};

export const readUserProfile = async (id: any): Promise<CreateUser> => {
	const res = await api.get(`/users/${id}`);
	return res.data;
};

export const readMyProfile = async (): Promise<CreatedUser> => {
	const res = await api.get("/users/showMe");
	return res.data;
};
