import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
	return <div className="w-11/12  m-auto mt-5">{children}</div>;
};

export default Container;
