import React from "react";
import Typography from "./Typography";

interface Props {
	title?: string;
	description?: string;
	children: React.ReactNode;
}

const Card = (props: Props) => {
	return (
<<<<<<< HEAD
		<main className="w-11/12 p-4 m-auto mt-5 bg-slate-50 rounded-md shadow-md max-h-screen overflow-hidden">
			<div className="h-14">
=======
		<main className="w-11/12  m-auto mt-5 bg-slate-50 rounded-md shadow-md max-h-screen overflow-hidden">
			<div className="h-14 p-4">
>>>>>>> 43e518c66a177dd89cce1bbad8d5e42e471a1ff0
				<Typography
					variant={"h4"}
					className="font-bold px-1"
					size="lg"
					color="primary-main"
				>
					{props.title}
				</Typography>
			</div>
<<<<<<< HEAD
			{props.children}
			{props.description && (
				<div className="h-14 p-4">
					<Typography
						variant={"h6"}
						className="text-secondary-contrastText font-semibold text-base  px-1"
					>
						{props.description}
					</Typography>
				</div>
			)}
=======
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
>>>>>>> 43e518c66a177dd89cce1bbad8d5e42e471a1ff0
		</main>
	);
};

export default Card;
