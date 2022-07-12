import axios from "axios";
import { FetchAllUsers } from "../../services/user.services";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import { createUser } from "../../services/user.services";

// local imports
import { FetchUsers, User } from "../interfaces/api-interfaces";
import { CreateUser, CreateUserProps } from "./../interfaces/api-interfaces";

const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	headers: {
		"Content-type": "application/json",
	},
});

export const useFetchAllUsers = (onSuccess: (res: FetchUsers) => void) => {
	return useQuery("/users", FetchAllUsers, { onSuccess });
};

export const useCreatUserQuery = () => {
	return useMutation("create user", createUser);
};

export const useReadUserProfileQuery = (params: { id: string }) => {
	return useQuery(
		["get user", params.id],
		async () => {
			return await api.get<User>(generatePath("/users/:id", { id: params.id }));
		},
		{
			staleTime: Infinity,
		}
	);
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
