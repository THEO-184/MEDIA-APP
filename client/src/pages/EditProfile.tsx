import React, { useState } from "react";
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
	CreateUserProps,
} from "../common/interfaces/api-interfaces";
import { FormSchema } from "../utils/formSchema";
import api, { useReadUserProfileQuery } from "../common/queries/api-user";
import { useAuth } from "../components/AppContext";

type FormData = z.infer<typeof FormSchema>;

const EditProfile = () => {
	// callback after user is succesfully created
	const { id } = useParams();
	const auth = useAuth();
	const [userDetails, setUserData] = useState<CreatedUser>({} as CreatedUser);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: auth ? auth.email : "",
			name: auth ? auth.name : "",
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
		async (userData: CreateUserProps): Promise<{ msg: string }> => {
			return await api.put(`/users/${id}`, userData);
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

	// send data to backend
	const onSubmit: SubmitHandler<FormData> = (data) => {
		mutate(data);
		reset({
			name: "",
			email: "",
			password: "",
		});
	};

	return (
		<Container>
			<Card
				title="Edit Profile"
				description="create your account"
				width="w-[400px]"
			>
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
							{isLoading ? "creating user" : "SIGN UP"}
						</Button>
					</Box>
				</form>
			</Card>
			<ToastContainer />
		</Container>
	);
};

export default EditProfile;
