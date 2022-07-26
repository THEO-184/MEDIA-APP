import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	CreatedUser,
	CreateUser,
	User,
} from "../common/interfaces/api-interfaces";
import {
	useDeleteUserQuery,
	useReadMyProfile,
} from "../common/queries/api-user";
import Card from "../components/Card";
import Container from "../components/Container";
import ProfileCard from "../components/ProfileCard";

const MyProfile = () => {
	const [user, setUser] = useState<User>({} as User);
	const [userId, setUserId] = useState("");
	const [isToastCompleted, setIsToastCompleted] = useState(false);

	const { mutate, data, isLoading: isDeleting } = useDeleteUserQuery(userId);

	const handleDelete = () => {
		mutate();
	};

	const onSuccess = (res: CreateUser) => {
		setUser(res.user);
		setUserId(res.user._id);
	};
	const { isLoading } = useReadMyProfile(onSuccess);
	if (data) {
		toast.success(data.msg, {
			onClose(props) {
				setIsToastCompleted(true);
			},
		});
	}

	if (isToastCompleted) {
		return <Navigate to={"/"} />;
	}

	return (
		<Container>
			<Card title="My Profile" width="w-[500px]">
				<ProfileCard
					user={user}
					isLoading={isLoading}
					isLoggedInUser={true}
					handleDelete={handleDelete}
				/>
			</Card>
		</Container>
	);
};

export default MyProfile;
