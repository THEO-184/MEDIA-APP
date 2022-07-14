import React, { useEffect } from "react";
import { useAuth } from "../components/AppContext";
import { Outlet } from "react-router-dom";

import UnicornImg from "../assets//images/unicornbike.jpg";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Container from "../components/Container";

const Home = () => {
	const user = useAuth();
	console.log("user", user);
	return (
		<Container>
			<Card title="Home Page" description="Welcome to the MERN Skeleton Page">
				<div className="w-full h-[500px]">
					<img src={UnicornImg} alt="img" className="w-full h-full" />
				</div>
			</Card>
		</Container>
	);
};

export default Home;
