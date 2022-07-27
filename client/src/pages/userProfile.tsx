import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
import DefaultImg from "../assets/images/profile-icon-png-899.png";
import Typography from "../components/Typography";

const UserProfile = () => {
	const { id } = useParams();
	const auth = useAuth();
	const [person, setPerson] = useState<User>({} as User);
	const [people, setPeople] = useState<User["followers" | "following"]>([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [tabId, setTabId] = useState(TabId.Tab2);

	const onSuccess = (res: CreateUser) => {
		setPerson(res.user);
		const isFollowUser = res.user.followers.some(
			(follower) => follower._id === auth?._id
		);
		setPeople(res.user.followers);
		setIsFollowing(isFollowUser);
	};
	const { isLoading, error, isError, data } = useReadUserProfileQuery(
		id,
		onSuccess
	);

	const onFollowSuccess = (res: CreateUser) => onSuccess(res);
	const unFollowSuccess = onFollowSuccess;

	const { mutate: handleFollowUser } = useFollowUser(onFollowSuccess);
	const { mutate: handleUnFollowUser } = useUnFollowPerson(unFollowSuccess);

	// ===EVENTS ===

	const handleSetActiveTab = (id: TabId) => {
		setTabId(id);
		if (id == TabId.Tab3) {
			setPeople(person.following);
		} else {
			setPeople(person.followers);
		}
	};

	if (data) {
		console.log(data);
	}

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
				<Box className="flex w-full items-center justify-center my-7">
					{people.map((person) => {
						return (
							<div key={person._id} className="text-center mx-3">
								<div>
									<img
										src={person.photo || DefaultImg}
										alt={person.name}
										className="w-20 h-20 rounded-full"
									/>
								</div>
								<h3 className="text-indigo-900 text-xl font-semibold">
									{person.name}
								</h3>
							</div>
						);
					})}
				</Box>
			</Card>
		</Container>
	);
};

export default UserProfile;
