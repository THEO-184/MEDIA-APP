import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFollowUnfollowhook from "../common/hooks/useFollowUnfollowhook";
import { CreateUser, User } from "../common/interfaces/api-interfaces";
import {
	useDeleteUserQuery,
	useReadMyProfile,
} from "../common/queries/api-user";
import Card from "../components/Card";
import { Tabs } from "../utils/utilities";
import Container from "../components/Container";
import ProfileCard from "../components/ProfileCard";
import TabsComponent from "../components/Tabs";
import Box from "../components/Box";
import DefaultImg from "../assets/images/profile-icon-png-899.png";

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

	const { mutate, data, isLoading: isDeleting } = useDeleteUserQuery(userId);

	const handleDelete = () => {
		mutate();
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

export default MyProfile;
