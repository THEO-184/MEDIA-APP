import React from "react";
import { PrimaryColors, SecondaryColors } from "../Types";

type TypographyOwnProps<T extends React.ElementType> = {
	variant?: T;
};

type DynamicType = {
	className?: string;
	size?: "base" | "xl" | "2xl" | "lg";
	color?: PrimaryColors | SecondaryColors;
};

type PropsToOmit<
	T extends React.ElementType,
	P
> = keyof (TypographyOwnProps<T> & P);

type TypographyType<T extends React.ElementType, Props = {}> = Omit<
	React.ComponentPropsWithRef<T>,
	PropsToOmit<T, Props>
> &
	React.PropsWithChildren<TypographyOwnProps<T> & Props>;

const Typography = <T extends React.ElementType>({
	variant,
	children,
	className,
	size,
	color,
	...restProps
}: TypographyType<T, DynamicType>) => {
	const Component = variant || "h6";
	return (
		<Component
			{...restProps}
			className={`text-${size} text-${color} ${className}`}
		>
			{children}
		</Component>
	);
};

export default Typography;
