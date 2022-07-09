import React, { useEffect } from "react";
import UnicornImg from "../assets//images/unicornbike.jpg";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Text from "../components/polymorphic";
import { useFetchUsersQuery } from "../common/queries/api-user";

const Home = () => {
	const { isLoading, data, isSuccess, error } = useFetchUsersQuery();
	console.log(data);
	return (
		<main>
			<Card title="Home Page" description="Welcome to the MERN Skeleton Page" />
		</main>
	);
};

export default Home;
