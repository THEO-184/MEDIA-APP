import React, { useState } from "react";
import { CreatedUser, CreateUser } from "../common/interfaces/api-interfaces";
import {
	useDeleteUserQuery,
	useReadMyProfile,
} from "../common/queries/api-user";
import Card from "../components/Card";
import Container from "../components/Container";
import ProfileCard from "../components/ProfileCard";

const MyProfile = () => {
	const [user, setUser] = useState<CreatedUser>({} as CreatedUser);
	const [userId, setUserId] = useState("");

	const {
		mutate,
		data,
		isError,
		isLoading: isDeleting,
	} = useDeleteUserQuery(userId);

	const handleDelete = () => {
		mutate();
	};

	const onSuccess = (res: CreateUser) => {
		setUser(res.user);
		setUserId(res.user._id);
	};
	const { isLoading } = useReadMyProfile(onSuccess);
	if (data) {
		console.log("delete message", data.msg);
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
