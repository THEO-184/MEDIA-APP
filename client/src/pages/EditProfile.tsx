import React, { useState } from "react";
import ProfileImg from "../assets/images/profile-icon-png-899.png";
import { useMutation, useQueryClient } from "react-query";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

// ====  LOCAL IMPORTS ====
import Box from "../components/Box";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import TextField from "../components/TextField";
import {
	CreatedUser,
	CreateUser,
	SignUp,
} from "../common/interfaces/api-interfaces";
import { FormSchema } from "../utils/utilities";
import api, {
	useReadMyProfile,
	useReadUserProfileQuery,
} from "../common/queries/api-user";
import { useAuth } from "../components/AppContext";

type FormDataType = z.infer<typeof FormSchema>;

const EditProfile = () => {
	// callback after user is succesfully created
	const { id } = useParams();
	const [photoDetails, setPhotoDetails] = useState<File>({} as File);
	const auth = useAuth();
	const [userDetails, setUserData] = useState<CreateUser>({} as CreateUser);
	const [profileUrl, setProfileUrl] = useState("");

	const onSuccess = (res: CreateUser) => {
		setUserData(res);
		setProfileUrl(res.user.photo);
	};

	const { data } = useReadMyProfile(onSuccess);
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormDataType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: data?.user.email || "",
			about: data?.user.about || "",
			name: data?.user.name || "",
			password: "",
		},
	});

	//
	const queryClient = useQueryClient();

	const {
		data: message,
		mutate,
		isLoading,
	} = useMutation(
		async (userData: FormData): Promise<{ msg: string }> => {
			return await api.put(`/users/${id}`, userData, {
				headers: {
					Accept: "applications/json",
				},
			});
		},
		{
			onSuccess() {
				queryClient.invalidateQueries("users");
			},
		}
	);

	if (message) {
		toast.success(`user with id: ${id} succesfully updated`);
	}

	// select photo
	const handleChangePhoto: React.FormEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;
		const fileData = target.files![0];
		setPhotoDetails(fileData);
	};

	// send data to backend
	const onSubmit: SubmitHandler<FormDataType> = (data) => {
		let userData = new FormData();
		data.name && userData.append("name", data.name);
		data.email && userData.append("email", data.email);
		data.password && userData.append("password", data.password);
		data.about && userData.append("about", data.about);
		photoDetails.name && userData.append("image", photoDetails);
		mutate(userData);
		reset({
			name: "",
			about: "",
			email: "",
			password: "",
		});
		setPhotoDetails({} as File);
	};

	return (
		<Container>
			<Card
				title="Edit Profile"
				description="create your account"
				width="w-[400px]"
			>
				<div className="text-center flex justify-center my-3">
					<img
						src={profileUrl || ProfileImg}
						alt="profile-img"
						className="w-16 h-16 rounded-full"
					/>
				</div>
				<form className="text-center flex justify-center my-2">
					<label htmlFor="upload">
						<span className="block border-2 border-solid border-slate-800 focus:outline-none text-slate-800 hover:bg-slate-800 hover:text-white w-28 rounded-md cursor-pointer m-2">
							Upload
						</span>
						<span>{photoDetails.name}</span>
					</label>
					<input
						type={"file"}
						accept="image/*"
						id="upload"
						className="hidden"
						onChange={handleChangePhoto}
					/>
				</form>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								variant="filled"
								disabled={isLoading}
								placeholder="Name"
							/>
						)}
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mb-1">{errors.name.message}</p>
					)}
					<Controller
						name="about"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								variant="filled"
								disabled={isLoading}
								placeholder="About"
							/>
						)}
					/>
					{errors.about && (
						<p className="text-red-500 text-sm mb-1">{errors.about.message}</p>
					)}
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								variant="filled"
								disabled={isLoading}
								placeholder="Email"
							/>
						)}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mb-1">{errors.email.message}</p>
					)}

					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								variant="filled"
								disabled={isLoading}
								placeholder="Password"
							/>
						)}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm mb-1">
							{errors.password.message}
						</p>
					)}

					<Box className="flex items-center justify-center my-3">
						<Button
							variant="filled"
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading}
						>
							EDIT USER
						</Button>
					</Box>
				</form>
			</Card>
			<ToastContainer />
		</Container>
	);
};

export default EditProfile;
