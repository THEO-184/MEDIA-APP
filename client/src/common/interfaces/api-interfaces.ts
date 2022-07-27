interface Follower {
	_id: string;
	name: string;
	photo: string;
}
export interface User extends Follower {
	email: string;
	about: string;
	createdAt: string;
	updatedAt: string;
	following: Follower[];
	followers: Follower[];
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
