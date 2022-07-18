import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AppContext";

const ProtectedRoutes = () => {
	const auth = useAuth();

	return auth ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoutes;
