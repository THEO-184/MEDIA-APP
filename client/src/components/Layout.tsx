import React from "react";
import { Outlet } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";

const Layout = () => {
	return (
		<Container>
			<Navbar />
			<Outlet />
		</Container>
	);
};

export default Layout;
