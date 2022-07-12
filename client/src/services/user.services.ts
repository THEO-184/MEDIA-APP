import api from "../common/queries/api-user";
import {
	CreateUser,
	CreateUserProps,
	FetchUsers,
} from "../common/interfaces/api-interfaces";

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
