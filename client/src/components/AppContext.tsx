import React, { useEffect, useState, useContext, createContext } from "react";
import { User } from "../common/interfaces/api-interfaces";

const AppContext = createContext<User | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState<User | null>(null);

	useEffect(() => {
		const user = localStorage.getItem("user")
			? (JSON.parse(localStorage.getItem("user")!) as User)
			: null;
		setAuth(user);
	}, []);

	return <AppContext.Provider value={auth}>{children}</AppContext.Provider>;
};

export const useAuth = () => useContext(AppContext);

export default AppContextProvider;
