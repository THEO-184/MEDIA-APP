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
import {
	CreatedUser,
	createUserFn,
	FetchUsers,
	User,
} from "../interfaces/api-interfaces";
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
	return useQuery("/users", FetchAllUsers, {
		onSuccess,
		staleTime: 60 * 1000 * 20,
	});
};

// create user
export const useCreatUserQuery = (onSuccess: createUserFn) => {
	return useMutation(createUser, {
		onSuccess,
	});
};

// login User
export const useLoginUser = (onSuccess: createUserFn) => {
	return useMutation(loginUser, { onSuccess });
};

export const useReadUserProfileQuery = (id: any, onSuccess: createUserFn) => {
	return useQuery(["user", { id }], () => readUserProfile(id), {
		onSuccess,
	});
};

export const useReadMyProfile = (onSuccess: createUserFn) => {
	return useQuery("showMe", readMyProfile, {
		onSuccess,
	});
};

export const useUpdateUserQuery = (id: any, data: { name: string }) => {
	return useMutation(async () => {
		return await api.put<{ msg: string }>(
			generatePath("/users/:id", { id }),
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
