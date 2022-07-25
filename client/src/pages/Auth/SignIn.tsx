import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ====  LOCAL IMPORTS ====
import Box from "../../components/Box";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import { CreateUser, User } from "../../common/interfaces/api-interfaces";
import { useLoginUser } from "../../common/queries/api-user";
import { setTimeout } from "timers/promises";

const FormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, "password must be atleast 6 characters")
		.max(20, "name must be atmost 20 characters"),
});

type FormData = z.infer<typeof FormSchema>;

const SignIn = () => {
	const [userData, setUserData] = useState<CreateUser>({} as CreateUser);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(FormSchema),
	});

	//
	const queryClient = useQueryClient();

	// callback after user is succesfully created
	const onSuccess = (res: CreateUser) => {
		setUserData(res);
		queryClient.invalidateQueries("/users");
		localStorage.setItem("user", JSON.stringify(res.user));
		window.setTimeout(() => {
			window.location.assign("/");
		}, 3000);
	};

	// create user
	const { data, isLoading, isError, isSuccess, mutate } =
		useLoginUser(onSuccess);

	if (isError) {
		toast.error("Error while logging in user", {
			delay: 1000 * 10,
		});
	}

	if (isSuccess) {
		toast.success(`Hello ${data.user.name} , you are succesfully logged in`);
	}

	// send data to backend
	const onSubmit: SubmitHandler<FormData> = (data) => {
		mutate(data);
		reset({
			email: "",
			password: "",
		});
	};

	return (
		<Container>
			<Card title="Log In" width="w-[400px]">
				<form onSubmit={handleSubmit(onSubmit)}>
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
							LOG IN
						</Button>
					</Box>
				</form>
			</Card>
			<ToastContainer />
		</Container>
	);
};

export default SignIn;
