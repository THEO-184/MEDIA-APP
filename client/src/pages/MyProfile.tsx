import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CreatedUser, CreateUser } from "../common/interfaces/api-interfaces";
import { useReadMyProfile } from "../common/queries/api-user";
import { useAuth } from "../components/AppContext";
import Card from "../components/Card";
import Container from "../components/Container";
import ProfileCard from "../components/ProfileCard";
import Typography from "../components/Typography";

const MyProfile = () => {
	const [user, setUser] = useState<CreatedUser>({} as CreatedUser);

	const onSuccess = (res: CreateUser) => {
		setUser(res.user);
	};
	const { isLoading } = useReadMyProfile(onSuccess);

	return (
		<Container>
			<Card title="My Profile" width="w-[500px]">
				<ProfileCard user={user} isLoading={isLoading} isLoggedInUser={true} />
			</Card>
		</Container>
	);
};

export default MyProfile;
