import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
// ==== LOCAL IMPORTS
import Card from "../components/Card";
import Container from "../components/Container";

import {
	useFollowUser,
	useReadUserProfileQuery,
	useUnFollowPerson,
} from "../common/queries/api-user";
import { CreateUser, User } from "../common/interfaces/api-interfaces";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../components/AppContext";
import Box from "../components/Box";
import { TabId, Tabs } from "../utils/utilities";
import TabsComponent from "../components/Tabs";

const UserProfile = () => {
	const { id } = useParams();
	const auth = useAuth();
	const [person, setPerson] = useState<User>({} as User);
	const [isFollowing, setIsFollowing] = useState(false);
	const [tabId, setTabId] = useState(TabId.Tab2);

	const onSuccess = (res: CreateUser) => {
		setPerson(res.user);
		const isFollowUser = res.user.followers.some(
			(follower) => follower._id === auth?._id
		);
		setIsFollowing(isFollowUser);
	};
	const { isLoading, error, isError } = useReadUserProfileQuery(id, onSuccess);

	const onFollowSuccess = (res: CreateUser) => onSuccess(res);
	const unFollowSuccess = onFollowSuccess;

	const { mutate: handleFollowUser } = useFollowUser(onFollowSuccess);
	const { mutate: handleUnFollowUser } = useUnFollowPerson(unFollowSuccess);

	// ===EVENTS ===

	const handleSetActiveTab = (id: TabId) => {
		console.log("tab", id, typeof id);
		setTabId(id);
	};

	if (isError) {
		const axiosErr: any = error;

		if (axiosErr.response.request.status === 401) {
			return <Navigate to={"/signin"} />;
		}
	}

	return (
		<Container>
			<Card title="Profile" width="w-11/12">
				<ProfileCard
					handleFollowUser={handleFollowUser}
					handleUnFollowUser={handleUnFollowUser}
					isFollowing={isFollowing}
					user={person}
					isLoading={isLoading}
					isLoggedInUser={false}
				/>
				<TabsComponent
					Tabs={Tabs}
					handleSetActiveTab={handleSetActiveTab}
					tabId={tabId}
				/>
			</Card>
		</Container>
	);
};

export default UserProfile;
