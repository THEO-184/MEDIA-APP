import { z } from "zod";

export const FormSchema = z.object({
	name: z
		.string()
		.min(3, "name must be atleast 3 characters")
		.max(30, "name must be atmost 30 characters"),
	about: z
		.string()
		.min(3, "about must be atleast 3 characters")
		.max(150, "name must be atmost 150 characters"),
	email: z.string().email(),
	password: z
		.string()
		.min(6, "password must be atleast 6 characters")
		.max(20, "name must be atmost 20 characters"),
});

export enum TabId {
	Tab1 = 1,
	Tab2 = 2,
	Tab3 = 3,
}

export interface TabsType {
	name: "POSTS" | "FOLLOWERS" | "FOLLOWING";
	id: TabId;
}

export const Tabs: TabsType[] = [
	{
		name: "POSTS",
		id: TabId.Tab1,
	},
	{
		name: "FOLLOWERS",
		id: TabId.Tab2,
	},
	{
		name: "FOLLOWING",
		id: TabId.Tab3,
	},
];
