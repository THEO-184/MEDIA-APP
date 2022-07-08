import React from "react";
import Typography from "./Typography";
import Img from "../assets/images/unicornbike.jpg";

const Card = () => {
	return (
		<main className="max-w-screen-sm  m-auto mt-5 bg-slate-50 rounded-md shadow-md">
			<div className="h-14 p-4">
				<Typography
					variant={"h6"}
					className="text-primary-dark font-bold text-base px-1"
				>
					Home Page
				</Typography>
			</div>
			<div className="h-auto w-full">
				<img src={Img} alt="img" className="w-full h-full" />
			</div>
			<div className="h-14 p-4">
				<Typography
					variant={"h6"}
					className="text-secondary-contrastText font-semibold text-base  px-1"
				>
					Welcome to the MERN Skeleton home page.
				</Typography>
			</div>
		</main>
	);
};

export default Card;
