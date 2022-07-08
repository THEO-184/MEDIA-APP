import React from "react";
import Typography from "./Typography";

const Navbar = () => {
	return (
		<nav className="bg-slate-800 text-white h-16 p-5 flex items-center text-2xl">
			<div>
				<Typography className="text-base">MERN Stack</Typography>
			</div>
			<nav className="flex mx-8">
				<li className="mr-2 text-base">USERS</li>
				<li className="mr-2 text-base">SIGN UP</li>
				<li className="mr-2 text-base">SIGN IN</li>
			</nav>
		</nav>
	);
};

export default Navbar;
