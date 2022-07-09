import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Typography from "../components/Typography";
import { useFetchUsersQuery } from "../common/queries/api-user";
import { FetchUsers, User } from "../common/interfaces/api-interfaces";

const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const { data, isLoading, error } = useFetchUsersQuery();
	console.log(data);

	if (isLoading) {
		return <h1>isLoading...</h1>;
	}

	return (
		<div>
			<Card title="All Users">
				{data?.data.users.map((user) => {
					return (
						<div key={user._id}>
							<Typography size="base" color="primary-dark">
								{user.name}
							</Typography>
						</div>
					);
				})}
			</Card>
		</div>
	);
};

export default Users;
