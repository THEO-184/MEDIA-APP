import React from "react";
import { CreatedUser, CreateUser } from "../common/interfaces/api-interfaces";
import { CgProfile } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";

import Box from "./Box";
import Typography from "./Typography";
import Button from "./Button";
import { Link } from "react-router-dom";

type DeleteFn = (id: string) => void;
interface Props {
	user: CreatedUser;
	isLoading: boolean;
	isLoggedInUser: Boolean;
	handleDelete?: DeleteFn;
}

const ProfileCard = ({
	user,
	isLoading,
	isLoggedInUser,
	handleDelete,
}: Props) => {
	const { createdAt, email, name, _id } = user;
	const date = new Date(createdAt).toDateString();

	if (isLoading) {
		return <Box>Loading...</Box>;
	}
	return (
		<Box>
			<Box className="flex items-center justify-between w-full mb-3 w-">
				<Box className="flex w-1/2 items-center justify-between">
					<CgProfile size={"50"} />
					<Box className="flex flex-col">
						<h1>{name}</h1>
						<h1>{email}</h1>
					</Box>
				</Box>

				{isLoggedInUser && (
					<Box className="flex">
						<Link to={`/users/${user._id}/edit`}>
							<Button width="w-9">
								<MdEdit size={"25"} className="hover:text-red-600" />
							</Button>
						</Link>
						<Button width="w-9" onClick={() => handleDelete!(_id)}>
							<MdDelete size={"25"} className="text-red-600" />
						</Button>
					</Box>
				)}
			</Box>
			<hr />
			<h1>Joined: {date}</h1>
		</Box>
	);
};

export default ProfileCard;
