import React from "react";
// button can be a link or buttom
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
	variant?: "outlined" | "filled" | "standard";
};

type AnchorProps = React.ComponentPropsWithoutRef<"a"> & {
	variant?: "outlined" | "filled" | "standard";
};

// type predicate to check if it is  button or link

const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
	"href" in props;

// input/output options
type Overload = {
	(props: ButtonProps): JSX.Element;
	(props: AnchorProps): JSX.Element;
};

const Button: Overload = (props: ButtonProps | AnchorProps) => {
	if (hasHref(props)) return <a {...props} />;
	return (
		<button
			{...props}
			className={`${
				props.variant === "outlined"
					? "border-2 border-solid border-slate-800 focus:outline-none text-slate-800 hover:bg-slate-800 hover:text-white"
					: props.variant === "filled"
					? "bg-slate-800 border-2 border-slate-800 text-white focus:outline-none hover:bg-slate-100 hover:text-slate-800"
					: ""
			}  w-28 h-10 mb-3 rounded-md font-bold`}
		/>
	);
};

export default Button;
