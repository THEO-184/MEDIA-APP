import React from "react";
import { Outlet } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";
import { useAuth } from "./AppContext";

const Layout = () => {
	const user = useAuth();

	return (
		<Container>
			<Navbar />
			<Outlet />
		</Container>
	);
};

export default Layout;
