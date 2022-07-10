import React from "react";
import Typography from "./Typography";

interface Props {
	title?: string;
	description?: string;
	children: React.ReactNode;
}

const Card = (props: Props) => {
	return (
		<main className="w-11/12 p-4 m-auto mt-5 bg-slate-50 rounded-md shadow-md max-h-screen overflow-hidden">
			<div className="h-14">
				<Typography
					variant={"h4"}
					className="font-bold px-1"
					size="lg"
					color="primary-main"
				>
					{props.title}
				</Typography>
			</div>
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
		</main>
	);
};

export default Card;
