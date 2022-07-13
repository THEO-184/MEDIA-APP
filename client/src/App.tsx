import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Auth/Signup";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Home";
import Users from "./pages/Users";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="users" element={<Users />} />
				</Route>
				;
			</Routes>
		</Router>
	);
}

export default App;
