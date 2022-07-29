import { Navigate, useParams } from "react-router-dom";
// ==== LOCAL IMPORTS
import Card from "../components/Card";
import Container from "../components/Container";

import { useReadUserProfileQuery } from "../common/queries/api-user";

import ProfileCard from "../components/ProfileCard";
import Box from "../components/Box";
import { Tabs } from "../utils/utilities";
import TabsComponent from "../components/Tabs";
import useFollowUnfollowhook from "../common/hooks/useFollowUnfollowhook";
import ViewUsers from "./components/viewUsers";

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
				<ViewUsers people={people} />
			</Card>
		</Container>
	);
};

export default UserProfile;
