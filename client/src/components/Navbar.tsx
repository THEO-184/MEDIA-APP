import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../common/interfaces/api-interfaces";
import { useSignOutQuery } from "../common/queries/api-user";
import { useAuth } from "./AppContext";
import Box from "./Box";
import Button from "./Button";
import Typography from "./Typography";

const Navbar = () => {
	const auth = useAuth();
	const { data, isSuccess, refetch } = useSignOutQuery();

	const handleSignOut = () => {
		refetch();
		localStorage.removeItem("user");
	};
	if (isSuccess) {
		window.location.assign("/");
	}
	return (
		<nav className="bg-slate-800 text-white h-16">
			<div className="w-11/12 flex items-center justify-between h-full  text-2xl m-auto relative">
				<div className="absolute left-0">
					<Link to={"/"}>
						<Typography className="text-base">MERN Stack</Typography>
					</Link>
				</div>

				<ul className="flex w-72 justify-between m-auto">
					<Link to={"/users"}>
						<li className="text-base">USERS</li>
					</Link>
					<Link to={"/signup"}>
						<li className="text-base">SIGN UP</li>
					</Link>
					{!auth && (
						<Link to={"/signin"}>
							<li className="text-base">LOG IN</li>
						</Link>
					)}
					{auth && (
						<button onClick={handleSignOut}>
							<li className="text-base">SIGN OUT</li>
						</button>
					)}
				</ul>

				{auth && (
					<Link to={"/profile"}>
						<Typography size="base">PROFILE</Typography>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
