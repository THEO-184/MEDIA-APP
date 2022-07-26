import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
// ==== LOCAL IMPORTS
import Card from "../components/Card";
import Container from "../components/Container";
import Typography from "../components/Typography";
import { readUserProfile } from "../services/user.services";
import { useReadUserProfileQuery } from "../common/queries/api-user";
import {
	CreatedUser,
	CreateUser,
	User,
} from "../common/interfaces/api-interfaces";
import ProfileCard from "../components/ProfileCard";
import Button from "../components/Button";

const UserProfile = () => {
	const { id } = useParams();
	const [person, setPerson] = useState<User>({} as User);

	const onSuccess = (res: CreateUser) => {
		setPerson(res.user);
	};
	const { isLoading } = useReadUserProfileQuery(id, onSuccess);

	return (
		<Container>
			<Card title="Profile" width="w-[500px]">
				<ProfileCard
					user={person}
					isLoading={isLoading}
					isLoggedInUser={false}
				/>
			</Card>
		</Container>
	);
};

export default UserProfile;
