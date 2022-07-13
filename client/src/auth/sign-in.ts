import { useMutation, useQuery } from "react-query";
import { SignInProps, User } from "../common/interfaces/auth.interface";
import api from "../common/queries/api-user";
export const a = 5;

export const useSignInQuery = (data: SignInProps) => {
	return useMutation("sign-in", async () => {
		return await api.post<User>("/auth/signin", data);
	});
};

export const useSignOutQuery = () => {
	return useQuery("sign-out", async () => {
		return await api.get<{ msg: string }>("/auth/signout");
	});
};
