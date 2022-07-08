import React from "react";
import { PrimaryColors } from "../Types";

type TypographyOwnProps<T extends React.ElementType> = {
	variant?: T;
};

type TextColors = {
	className?: string;
};

type PropsToOmit<
	T extends React.ElementType,
	P
> = keyof (TypographyOwnProps<T> & P);

type TypographyType<T extends React.ElementType, Props = {}> = Omit<
	React.ComponentPropsWithoutRef<T>,
	PropsToOmit<T, Props>
> &
	React.PropsWithChildren<TypographyOwnProps<T> & Props>;

const Typography = <T extends React.ElementType>({
	variant,
	children,
	className,
	...restProps
}: TypographyType<T, TextColors>) => {
	const Component = variant || "h6";
	return (
		<Component {...restProps} className={`${className}`}>
			{children}
		</Component>
	);
};

export default Typography;
