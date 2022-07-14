import { generatePath } from "react-router-dom";
import api from "../common/queries/api-user";
import {
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

export const readUserProfile = async (id: any): Promise<User> => {
	const res = await api.get(`/users/${id}`);
	return res.data;
};
