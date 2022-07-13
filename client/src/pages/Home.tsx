import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import UnicornImg from "../assets//images/unicornbike.jpg";
import Card from "../components/Card";

const Home = () => {
	return (
		<main>
			<Card title="Home Page" description="Welcome to the MERN Skeleton Page">
				<div className="w-full h-[500px]">
					<img src={UnicornImg} alt="img" className="w-full h-full" />
				</div>
			</Card>
		</main>
	);
};

export default Home;
