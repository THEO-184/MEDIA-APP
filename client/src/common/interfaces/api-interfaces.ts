export interface User {
	email: string;
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	photo: string;
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
