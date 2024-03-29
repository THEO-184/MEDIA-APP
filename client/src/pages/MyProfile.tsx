import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFollowUnfollowhook from "../common/hooks/useFollowUnfollowhook";
import {
	useDeleteUserQuery,
	useFindPeople,
	useReadMyProfile,
} from "../common/queries/api-user";
import Card from "../components/Card";
import { TabId, Tabs } from "../utils/utilities";
import Container from "../components/Container";
import ProfileCard from "../components/ProfileCard";
import TabsComponent from "../components/Tabs";
import Box from "../components/Box";
import DefaultImg from "../assets/images/profile-icon-png-899.png";
import ViewUsers from "../user/components/viewUsers";

const MyProfile = () => {
	const [isToastCompleted, setIsToastCompleted] = useState(false);
	const [
		handleUnFollowUser,
		handleSetActiveTab,
		onSuccess,
		isFollowing,
		person,
		people,
		userId,
		handleFollowUser,
		tabId,
		setTabId,
		setPeople,
	] = useFollowUnfollowhook();

	const { mutate, data: DeletedUser } = useDeleteUserQuery(userId);
	const { data: peopleToFollow } = useFindPeople();

	if (peopleToFollow) {
		console.log("follow", peopleToFollow);
	}

	const handleDelete = () => {
		mutate();
	};

	const { isLoading } = useReadMyProfile(onSuccess);
	if (DeletedUser) {
		toast.success(DeletedUser.msg, {
			onClose(props) {
				setIsToastCompleted(true);
			},
		});
	}

	if (isToastCompleted) {
		return <Navigate to={"/"} />;
	}
	const profileTabs: typeof Tabs = [
		...Tabs,
		{
			id: TabId.Tab4,
			name: "WHO TO FOLLOW",
		},
	];

	return (
		<Container>
			<Card title="My Profile" width="w-11/12">
				<ProfileCard
					user={person}
					isLoading={isLoading}
					isLoggedInUser={true}
					isFollowing={isFollowing}
					handleDelete={handleDelete}
					handleFollowUser={handleFollowUser}
					handleUnFollowUser={handleUnFollowUser}
				/>
				<TabsComponent
					Tabs={profileTabs}
					handleSetActiveTab={handleSetActiveTab}
					tabId={tabId}
				/>
				<ViewUsers people={people} />
			</Card>
		</Container>
	);
};

export default MyProfile;
