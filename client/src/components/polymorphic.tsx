import React from "react";

type Color = "text-blue-50" | "text-red-400" | "text-green-400";

type TextProps<T extends React.ElementType> = {
	as?: T;
	color?: Color | "text-green-600";
};

type AsProps<T extends React.ElementType> = {
	as?: T;
};

type TextColorProps = {
	color?: Color | "text-green-600";
};

// define the props type to be passed to the component and extend the default HTML prop type of the as element while removing default HTML properties of as that exists on TextProps
type Props<T extends React.ElementType> = React.PropsWithChildren<
	TextProps<T>
> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>;

type PolymorphicComponentProp<
	T extends React.ElementType,
	Props = {}
> = React.PropsWithChildren<Props & AsProps<T>> &
	Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProps<T> & P);

// props to omit

const Text = React.forwardRef(
	<T extends React.ElementType = "span">({
		as,
		children,
		color,
		...restProps
	}: PolymorphicComponentProp<T, TextColorProps>) => {
		const Component = as || "span";
		return (
			<Component {...restProps} className={color}>
				{children}
			</Component>
		);
	}
);

export default Text;
