export interface User {
	email: string;
	_id: string;
	name: string;
	about: string;
	createdAt: string;
	updatedAt: string;
	photo: string;
	following: { _id: string; name: string }[];
	followers: { _id: string; name: string }[];
}

export interface FetchUsers {
	count: number;
	users: User[];
}

export interface SignUp extends Pick<User, "name" | "email"> {
	password: string;
}

export type CreatedUser = Omit<User, "updatedAt" | "photo">;
export interface CreateUser {
	status: boolean;
	user: User;
}

export type createUserFn = (res: CreateUser) => void;
