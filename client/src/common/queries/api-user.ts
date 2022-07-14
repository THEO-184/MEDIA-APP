import axios from "axios";
import {
	FetchAllUsers,
	loginUser,
	createUser,
	readUserProfile,
	readMyProfile,
} from "../../services/user.services";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";

// local imports
import { FetchUsers, User } from "../interfaces/api-interfaces";
import { CreateUser, CreateUserProps } from "./../interfaces/api-interfaces";

const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
	},
});

// get all users
export const useFetchAllUsers = (onSuccess: (res: FetchUsers) => void) => {
	return useQuery("fetch-users", FetchAllUsers, { onSuccess });
};

// create user
export const useCreatUserQuery = (onSuccess: (res: CreateUser) => void) => {
	return useMutation("create-user", createUser, {
		onSuccess,
	});
};

// login User
export const useLoginUser = (onSuccess: (res: CreateUser) => void) => {
	return useMutation("signin", loginUser, { onSuccess });
};

export const useReadUserProfileQuery = (id: any) => {
	return useQuery(["users", id], () => readUserProfile(id));
};

export const useReadMyProfile = () => {
	return useQuery("profile", readMyProfile);
};

export const useUpdateUserQuery = (
	params: { id: string },
	data: { name: string }
) => {
	return useMutation("update user", async () => {
		return await api.put<{ msg: string }>(
			generatePath("/users/:id", { id: params.id }),
			data
		);
	});
};

export const useDeleteUserQuery = (params: { id: string }) => {
	return useMutation("delete user", async () => {
		return await api.delete<{ msg: string }>(
			generatePath("/users/:id", { id: params.id })
		);
	});
};

export default api;
