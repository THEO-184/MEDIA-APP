export interface User {
	email: string;
	_id: string;
	name: string;
}

export interface FetchUsers {
	count: number;
	users: User[];
}

export interface CreateUserProps extends Omit<User, "_id"> {
	password: string;
}

export type CreatedUser = User & { createdAt: string };
export interface CreateUser {
	status: boolean;
	user: CreatedUser;
}
