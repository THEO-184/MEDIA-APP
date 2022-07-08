import React from "react";
import UnicornImg from "../assets//images/unicornbike.jpg";
import Text from "../components/polymorphic";

const Home = () => {
	return (
		<main>
			<h6>Home Page</h6>
			<Text as={"div"} color="text-green-400">
				Hello world
			</Text>
			<Text as="a" href="https://www.google.com">
				Google
			</Text>
			<Text as={"em"}>em</Text>
			<Text color="text-red-400">span</Text>
			{/* <div>
				<img src={UnicornImg} alt="unicorm" />
				<h5>Unicorn Bicycle</h5>
			</div> */}
			<div className="">
				<h6>Welcome to the MERN SKELETON</h6>
			</div>
		</main>
	);
};

export default Home;
