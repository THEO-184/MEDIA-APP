import React, { useState } from "react";
import { CreatedUser, CreateUser } from "../common/interfaces/api-interfaces";
import { useReadMyProfile } from "../common/queries/api-user";
import Card from "../components/Card";
import Container from "../components/Container";
import ProfileCard from "../components/ProfileCard";
import Typography from "../components/Typography";

const MyProfile = () => {
	const [user, setUser] = useState<CreatedUser>({} as CreatedUser);

	const onSuccess = (res: CreateUser) => {
		setUser(res.user);
	};

	const { data, isLoading } = useReadMyProfile(onSuccess);

	return (
		<Container>
			<Card title="My Profile" width="w-1/2">
				<ProfileCard user={user} isLoading={isLoading} />
			</Card>
		</Container>
	);
};

export default MyProfile;
