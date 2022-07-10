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
<<<<<<< HEAD
		<main className="w-11/12 p-4 m-auto mt-5 bg-slate-50 rounded-md shadow-md max-h-screen overflow-hidden">
			<div className="h-14">
=======
		<main className="w-11/12  m-auto mt-5 bg-slate-50 rounded-md shadow-md max-h-screen overflow-hidden">
			<div className="h-14 p-4">
>>>>>>> 43e518c66a177dd89cce1bbad8d5e42e471a1ff0
>>>>>>> 94d551e35a4c4ddf2f19fb4e035571271e2f52b2
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
=======
<<<<<<< HEAD
>>>>>>> 94d551e35a4c4ddf2f19fb4e035571271e2f52b2
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
<<<<<<< HEAD
=======
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
>>>>>>> 94d551e35a4c4ddf2f19fb4e035571271e2f52b2
		</main>
	);
};

export default Card;
