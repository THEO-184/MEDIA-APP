import React from "react";
import { CreatedUser, CreateUser } from "../common/interfaces/api-interfaces";
import { CgProfile } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";

import Box from "./Box";
import Typography from "./Typography";
import Button from "./Button";

const ProfileCard = ({
	user,
	isLoading,
}: {
	user: CreatedUser;
	isLoading: boolean;
}) => {
	const { createdAt, email, name } = user;

	if (isLoading) {
		return <Box>Loading...</Box>;
	}
	return (
		<Box>
			<Box className="flex items-center justify-between w-full mb-3 w-">
				<Box className="flex w-48 items-center justify-between">
					<CgProfile size={"50"} />
					<Box className="flex flex-col">
						<Typography variant={"span"}>{name}</Typography>
						<Typography variant={"span"}>{email}</Typography>
					</Box>
				</Box>

				<Box className="flex">
					<Button width="w-9">
						<MdEdit size={"25"} className="hover:text-red-600" />
					</Button>
					<Button width="w-9">
						<MdDelete size={"25"} className="text-red-600" />
					</Button>
				</Box>
			</Box>
			<hr />
			<Typography>Joined: {createdAt}</Typography>
		</Box>
	);
};

export default ProfileCard;
