import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Auth/Signup";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="users" element={<Users />} />
					<Route path="users/:id" element={<Profile />} />
					<Route path="*" element={<h1>Error Page</h1>} />;
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
