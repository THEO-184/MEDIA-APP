import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";

// local imports
import { FetchUsers, User } from "../interfaces/api-interfaces";
import { CreateUser, CreateUserProps } from "./../interfaces/api-interfaces";

const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	headers: {
		"Content-type": "application/json",
	},
});

export const useFetchUsersQuery = () => {
	return useQuery(
		"fetch all users",
		async () => {
			return await api.get<FetchUsers>("/users");
		},
		{
			staleTime: Infinity,
		}
	);
};

export const useCreatUserQuery = (data: CreateUserProps) => {
	return useMutation("create user", async () => {
		return await api.post<CreateUser>("/users", data);
	});
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
