import React from "react";
import Typography from "./Typography";

interface Props {
	title?: string;
	description?: string;
	children: React.ReactNode;
	width?: string;
}

const Card = (props: Props) => {
	return (
		<main
			className={`${
				props.width ? props.width : "w-full"
			} p-4 bg-white rounded-md m-auto  shadow-lg shadow-gray-600`}
		>
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
				<div className="h-14 py-4">
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
