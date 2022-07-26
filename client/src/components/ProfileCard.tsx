import React from "react";
import { User } from "../common/interfaces/api-interfaces";
import DefaultImg from "../assets/images/profile-icon-png-899.png";

import { MdEdit, MdDelete } from "react-icons/md";
import Popup from "reactjs-popup";

import Box from "./Box";
import Typography from "./Typography";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAuth } from "./AppContext";

type DeleteFn = (id: string) => void;
interface Props {
	user: User;
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
	const { createdAt, email, name, _id, photo } = user;
	const date = new Date(createdAt).toDateString();
	const auth = useAuth();

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	const isFollowUser = user.followers.some(
		(follower) => follower._id === auth?._id
	);

	return (
		<Box>
			<Box className="flex items-center justify-between w-full mb-3 w-">
				<Box className="flex items-center justify-between ">
					<img
						src={photo || DefaultImg}
						alt="user"
						className="w-14 h-14 rounded-full"
					/>
					<Box className="flex flex-col ml-5">
						<h1>{name}</h1>
						<h1>{email}</h1>
					</Box>
				</Box>

				{isLoggedInUser ? (
					<div className="flex">
						<Link to={`/users/${user._id}/edit`}>
							<Button width="w-9">
								<MdEdit size={"25"} className="hover:text-red-600" />
							</Button>
						</Link>
						<Popup
							modal
							trigger={
								//
								<Button width="w-9">
									<MdDelete size={"25"} className="text-red-600" />
								</Button>
							}
							position="center center"
						>
							<div className="w-full text-center border border-solid p-1 h-24 flex items-center justify-center">
								<Button variant="filled" onClick={() => handleDelete!(_id)}>
									Yes
								</Button>
								<Button variant="outlined">No</Button>
							</div>
						</Popup>
					</div>
				) : (
					<Box className="w-">
						{isFollowUser ? (
							<Button color="green" variant="filled">
								UnFollow
							</Button>
						) : (
							<Button variant="filled">Follow</Button>
						)}
					</Box>
				)}
			</Box>
			<hr />
			<h1 className="mt-2">Joined: {date}</h1>
		</Box>
	);
};

export default ProfileCard;
