import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
// ==== LOCAL IMPORTS
import Card from "../components/Card";
import Container from "../components/Container";
import Typography from "../components/Typography";
import { readUserProfile } from "../services/user.services";
import {
	useFollowUser,
	useReadUserProfileQuery,
	useUnFollowPerson,
} from "../common/queries/api-user";
import {
	CreatedUser,
	CreateUser,
	User,
} from "../common/interfaces/api-interfaces";
import ProfileCard from "../components/ProfileCard";
import Button from "../components/Button";
import { useAuth } from "../components/AppContext";

const UserProfile = () => {
	const { id } = useParams();
	const auth = useAuth();
	const [person, setPerson] = useState<User>({} as User);
	const [isFollowing, setIsFollowing] = useState(false);

	const onSuccess = (res: CreateUser) => {
		setPerson(res.user);
		const isFollowUser = res.user.followers.some(
			(follower) => follower._id === auth?._id
		);
		setIsFollowing(isFollowUser);
	};
	const { isLoading } = useReadUserProfileQuery(id, onSuccess);

	const onFollowSuccess = (res: CreateUser) => onSuccess(res);
	const unFollowSuccess = onFollowSuccess;

	const { mutate: handleFollowUser } = useFollowUser(onFollowSuccess);
	const { mutate: handleUnFollowUser } = useUnFollowPerson(unFollowSuccess);

	return (
		<Container>
			<Card title="Profile" width="w-[500px]">
				<ProfileCard
					handleFollowUser={handleFollowUser}
					handleUnFollowUser={handleUnFollowUser}
					isFollowing={isFollowing}
					user={person}
					isLoading={isLoading}
					isLoggedInUser={false}
				/>
			</Card>
		</Container>
	);
};

export default UserProfile;
