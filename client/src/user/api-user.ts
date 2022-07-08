import axios from "axios";
import { useQuery } from "react-query";
export const a = 5;
const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	headers: {
		"Content-type": "application/json",
	},
});

export const useFetchUsersQuery = () => {
	return useQuery(
		"fetch all users",
		async () => {
			return await api.get("/users");
		},
		{
			staleTime: Infinity,
		}
	);
};

export const useCreatUserQuery = () => {
	return useQuery("create user", async () => {
		return await api.post("/users");
	});
};

export default api;
