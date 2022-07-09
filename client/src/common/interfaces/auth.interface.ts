export interface SignIn {
	email: string;
	password: string;
}

export interface User {
	user: { name: string; email: string; id: string };
}
