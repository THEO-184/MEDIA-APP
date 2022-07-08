import React from "react";
import { PrimaryColors } from "../Types";

type TypographyOwnProps<T extends React.ElementType> = {
	variant?: T;
	color?: PrimaryColors | "text-primary-openTitle";
};

type PropsToOmit<T extends React.ElementType> = keyof TypographyOwnProps<T>;

type TypographyType<T extends React.ElementType> = Omit<
	React.ComponentPropsWithoutRef<T>,
	PropsToOmit<T>
> &
	React.PropsWithChildren<TypographyOwnProps<T>>;

const Typography = <T extends React.ElementType>({
	variant,
	children,
	color,
	...restProps
}: TypographyType<T>) => {
	const Component = variant || "h6";
	return (
		<Component {...restProps} className={color}>
			{children}
		</Component>
	);
};

export default Typography;
