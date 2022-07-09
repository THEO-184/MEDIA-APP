import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/Auth/SignIn";
import SignOut from "./pages/Auth/SignOut";
import Home from "./pages/Home";
import Users from "./pages/Users";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="signout" element={<SignOut />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="users" element={<Users />} />
				</Route>
				;
			</Routes>
		</Router>
	);
}

export default App;
