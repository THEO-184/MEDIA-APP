import React from "react";
import Typography from "./Typography";
import Img from "../assets/images/unicornbike.jpg";

interface Props {
	title: string;
	description?: string;
}

const Card = (props: Props) => {
	return (
		<main className="w-11/12  m-auto mt-5 bg-slate-50 rounded-md shadow-md max-h-screen overflow-hidden">
			<div className="h-14 p-4">
				<Typography
					variant={"h6"}
					className="text-primary-dark font-bold text-base px-1"
				>
					{props.title}
				</Typography>
			</div>
			<div className="w-full h-[500px]">
				<img src={Img} alt="img" className="w-full h-full" />
			</div>
			<div className="h-14 p-4">
				<Typography
					variant={"h6"}
					className="text-secondary-contrastText font-semibold text-base  px-1"
				>
					{props.description}
				</Typography>
			</div>
		</main>
	);
};

export default Card;
