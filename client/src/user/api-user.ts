import axios from "axios";
export const a = 5;
export default axios.create({
	baseURL: "http://localhost:5000/",
	headers: {
		"Content-type": "application/json",
	},
});
