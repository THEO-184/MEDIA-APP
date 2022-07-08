import React from "react";
import Typography from "./Typography";
import Img from "../assets/images/unicornbike.jpg";

const Card = () => {
	return (
		<main className="max-w-screen-sm max-h-96 m-auto mt-5">
			<Typography variant={"h6"} color="text-primary-main">
				Home Page
			</Typography>
			<div className="max-h-96 w-full">
				<img src={Img} alt="img" className="max-w-full max-h-full" />
			</div>
			<div>
				<Typography>Welcome to the MERN Skeleton home page.</Typography>
			</div>
		</main>
	);
};

export default Card;
