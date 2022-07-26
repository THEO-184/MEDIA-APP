import React from "react";
// button can be a link or buttom
type ButtonProps = Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
	variant?: "outlined" | "filled" | "standard";
	width?: string;
	color?: string;
};

type AnchorProps = Omit<React.ComponentPropsWithoutRef<"a">, "color"> & {
	variant?: "outlined" | "filled" | "standard";
	width?: string;
	color?: string;
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
					? `border-2 border-solid ${
							props.color
								? `border-${props.color}-800 text-${props.color}-800 hover:bg-${props.color}-800`
								: "border-slate-800 text-slate-800 hover:bg-slate-800"
					  }  hover:text-white`
					: props.variant === "filled"
					? `${
							props.color
								? `bg-yellow-800 border-${props.color}-800 hover:bg-${props.color}-100 hover:text-${props.color}-800`
								: "bg-slate-800 border-2 border-slate-800  hover:bg-slate-100 hover:text-slate-800"
					  }  text-white focus:outline-none`
					: ""
			}  ${props.width ? props.width : "w-28"} h-10 mb-3 rounded-md font-bold`}
		/>
	);
};

export default Button;
