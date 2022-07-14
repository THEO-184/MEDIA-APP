import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
// ==== LOCAL IMPORTS
import Card from "../components/Card";
import Container from "../components/Container";
import Typography from "../components/Typography";
import { readUserProfile } from "../services/user.services";
import { useReadUserProfileQuery } from "../common/queries/api-user";
import { User } from "../common/interfaces/api-interfaces";

const Profile = () => {
	const { id } = useParams();
	const [userId, setUser] = useState(id);
	const { data } = useReadUserProfileQuery(userId);
	return (
		<Container>
			<Card title="Profile" width="w-3/5">
				<Typography>Welcome, {id}</Typography>
			</Card>
		</Container>
	);
};

export default Profile;
