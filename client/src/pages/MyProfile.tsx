import React from "react";
import { useReadMyProfile } from "../common/queries/api-user";
import Card from "../components/Card";
import Container from "../components/Container";
import Typography from "../components/Typography";

const MyProfile = () => {
	const { data, isLoading } = useReadMyProfile();
	console.log(data);
	return (
		<Container>
			<Card title="My Profile">
				<Typography>{isLoading ? "Loadding" : data?.user.name}</Typography>
			</Card>
		</Container>
	);
};

export default MyProfile;
