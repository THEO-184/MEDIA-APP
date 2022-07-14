import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { IoMdContact } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import { AxiosError } from "axios";

// ==== LOCAL IMPORTS ===;
import Card from "../components/Card";
import Typography from "../components/Typography";
import { FetchUsers, User } from "../common/interfaces/api-interfaces";
import { FetchAllUsers } from "../services/user.services";
import Box from "../components/Box";
import Container from "../components/Container";
import { useFetchAllUsers } from "../common/queries/api-user";
import { toast } from "react-toastify";

const Users = () => {
	const [users, setUsers] = useState<User[]>([]);

	const onSuccess = (res: FetchUsers) => {
		setUsers(res.users);
	};
	const { isLoading, data, error } = useFetchAllUsers(onSuccess);

	if (error instanceof AxiosError) {
		return <div>An error occured: ${error.response?.data?.msg}</div>;
	}

	return (
		<Container>
			<Card title="All Users" width="w-1/2">
				{isLoading ? (
					<h1>Loading..</h1>
				) : (
					data?.users.map((user) => {
						return (
							<Box key={user._id}>
								<Link to={`/users/${user._id}`}>
									<Box
										className={`flex items-center justify-between hover:bg-slate-50`}
									>
										<Box className="flex items-center">
											<IoMdContact size={"70"} />
											<Typography
												size="2xl"
												color="primary-dark"
												className="ml-5"
											>
												{user.name}
											</Typography>
										</Box>
										<Box className="cursor-pointer">
											<BsArrowRight size={"50"} />
										</Box>
									</Box>
								</Link>
							</Box>
						);
					})
				)}
			</Card>
		</Container>
	);
};

export default Users;
