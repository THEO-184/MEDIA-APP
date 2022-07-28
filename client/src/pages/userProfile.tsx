import { Navigate, useParams } from "react-router-dom";
// ==== LOCAL IMPORTS
import Card from "../components/Card";
import Container from "../components/Container";

import { useReadUserProfileQuery } from "../common/queries/api-user";

import ProfileCard from "../components/ProfileCard";
import Box from "../components/Box";
import { Tabs } from "../utils/utilities";
import TabsComponent from "../components/Tabs";
import DefaultImg from "../assets/images/profile-icon-png-899.png";
import useFollowUnfollowhook from "../common/hooks/useFollowUnfollowhook";

const UserProfile = () => {
	const { id } = useParams();
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

	const { isLoading, error, isError, data } = useReadUserProfileQuery(
		id,
		onSuccess
	);

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
