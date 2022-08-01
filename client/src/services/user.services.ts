import api from "../common/queries/api-user";
import {
	CreatedUser,
	CreateUser,
	SignUp,
	FetchUsers,
	User,
} from "../common/interfaces/api-interfaces";
import { SignInProps } from "../common/interfaces/auth.interface";

export const FetchAllUsers = async (): Promise<FetchUsers> => {
	const res = await api.get("/users");
	return res?.data;
};

export const createUser = async (data: SignUp): Promise<CreateUser> => {
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

export const readMyProfile = async (): Promise<User> => {
	const res = await api.get("/users/showMe");
	return res.data;
};

export const updateProfile = async (
	id: any,
	data: SignUp
): Promise<{ msg: string }> => {
	const res = await api.put(`/users/${id}`, data);
	return res.data;
};

export const deleteUser = async (id: string): Promise<{ msg: string }> => {
	const res = await api.delete(`/users/${id}`);
	return res.data;
};

export const signOut = async (): Promise<{ msg: string }> => {
	const res = await api.get("/auth/signout");
	return res.data;
};

export const followPerson = async (id: any): Promise<CreateUser> => {
	const res = await api.put("/users/follow", { id });
	return res.data;
};

export const unFollowPerson = async (id: any): Promise<CreateUser> => {
	const res = await api.put("/users/unfollow", { id });
	return res.data;
};

export const findPeople = async (): Promise<FetchUsers> => {
	const res = await api.get("/users/findpeople");
	return res.data;
};
