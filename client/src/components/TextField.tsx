import React from "react";

export interface Props extends React.ComponentPropsWithoutRef<"input"> {
	variant?: "outlined" | "filled" | "standard";
}

const TextField = (props: Props) => {
	const { variant, ...restProps } = props;
	return (
		<input
			{...restProps}
			className={`${
				variant === "outlined"
					? "border-2 border-solid border-blue-600 focus:outline-none"
					: variant === "filled"
					? "bg-slate-200 border-b-2 border-b-blue-500 focus:outline-none"
					: "border-b-2 border-b-blue-500 focus:outline-none"
			}  w-full h-10 p-2 mx-auto block mb-3 placeholder:text-left placeholder:text-slate-700`}
		/>
	);
};

export default TextField;
