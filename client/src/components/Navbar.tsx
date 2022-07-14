import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../common/interfaces/api-interfaces";
import { useAuth } from "./AppContext";
import Typography from "./Typography";

const Navbar = () => {
	return (
		<nav className="bg-slate-800 text-white h-16">
			<div className="w-11/12 flex items-center justify-between h-full  text-2xl m-auto relative">
				<div className="absolute left-0">
					<Link to={"/"}>
						<Typography className="text-base">MERN Stack</Typography>
					</Link>
				</div>
				<ul className="flex w-60 justify-between m-auto">
					<Link to={"/users"}>
						<li className="text-base">USERS</li>
					</Link>
					<Link to={"/signup"}>
						<li className="text-base">SIGN UP</li>
					</Link>
					<Link to={"/signin"}>
						<li className="text-base">LOG IN</li>
					</Link>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
