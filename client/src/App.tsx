import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SignUp from "./pages/Auth/Signup";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Home";
import Users from "./user/Users";
import UserProfile from "./user/userProfile";
import Layout from "./components/Layout";
import MyProfile from "./pages/MyProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditProfile from "./pages/EditProfile";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="signin" element={<SignIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="users" element={<Users />} />
					{/* <Route element={<ProtectedRoutes />}> */}
					<Route path="profile" element={<MyProfile />} />
					<Route path="users/:id" element={<UserProfile />} />
					<Route path="users/:id/edit" element={<EditProfile />} />
					{/* </Route> */}
					<Route path="*" element={<h1>Error Page</h1>} />;
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
