import React from "react";

type AsProps<T extends React.ElementType> = {
	as?: T;
	className?: string;
};

type SpecialProps = {};

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProps<T> & P);

type Props<T extends React.ElementType, Props = {}> = React.PropsWithChildren<
	AsProps<T>
> &
	Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

const Box = <T extends React.ElementType>({
	as,
	children,
	className,
	...restProps
}: Props<T, SpecialProps>) => {
	const Component = as || "div";
	return (
		<Component {...restProps} className={`${className}`}>
			{children}
		</Component>
	);
};

export default Box;
