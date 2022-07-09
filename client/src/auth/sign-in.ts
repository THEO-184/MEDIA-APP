import { useMutation, useQuery } from "react-query";
import { SignIn, User } from "../common/interfaces/auth.interface";
import api from "../common/queries/api-user";
export const a = 5;

export const useSignInQuery = (data: SignIn) => {
	return useMutation("sign-in", async () => {
		return await api.post<User>("/auth/signin", data);
	});
};

export const useSignOutQuery = () => {
	return useQuery("sign-out", async () => {
		return await api.get<{ msg: string }>("/auth/signout");
	});
};
