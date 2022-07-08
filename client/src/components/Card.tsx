import React from "react";
import Typography from "./Typography";
import Img from "../assets/images/unicornbike.jpg";

const card = () => {
	return (
		<div className="max-w-screen-sm max-h-96 m-auto mt-5">
			<Typography variant={"h6"} color="text-primary-openTitle">
				Home Page
			</Typography>
			<div className="max-h-96 w-full">
				<img src={Img} alt="img" className="max-w-full max-h-full" />
			</div>
		</div>
	);
};

export default card;
