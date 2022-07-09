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

export interface CreateUser extends User {
	createdAt: string;
}
