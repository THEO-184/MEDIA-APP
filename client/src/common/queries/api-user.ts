import axios from "axios";
import {
	FetchAllUsers,
	loginUser,
	createUser,
	readUserProfile,
	readMyProfile,
	updateProfile,
	deleteUser,
	signOut,
	followPerson,
	unFollowPerson,
	findPeople,
} from "../../services/user.services";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";

// local imports
import { createUserFn, FetchUsers } from "../interfaces/api-interfaces";

const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
	},
});

// get all users
export const useFetchAllUsers = (onSuccess: (res: FetchUsers) => void) => {
	return useQuery("users", FetchAllUsers, {
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
	return useQuery("user", readMyProfile, {
		onSuccess,
	});
};

export const useDeleteUserQuery = (id: string, onSuccess?: () => void) => {
	return useMutation(() => deleteUser(id), { onSuccess });
};

export const useSignOutQuery = () => {
	return useQuery("signout", signOut, { enabled: false });
};

export const useFollowUser = (onFollowSuccess: createUserFn) => {
	return useMutation(followPerson, { onSuccess: onFollowSuccess });
};

export const useUnFollowPerson = (unFollowSuccess: createUserFn) => {
	return useMutation(unFollowPerson, { onSuccess: unFollowSuccess });
};

export const useFindPeople = () => {
	return useQuery("/findpeople", findPeople);
};

export default api;
