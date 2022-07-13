import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ====  LOCAL IMPORTS ====
import Box from "../../components/Box";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import { CreateUser } from "../../common/interfaces/api-interfaces";
import { useCreatUserQuery } from "../../common/queries/api-user";

const FormSchema = z.object({
	name: z
		.string()
		.min(3, "name must be atleast 3 characters")
		.max(30, "name must be atmost 30 characters"),
	email: z.string().email(),
	password: z
		.string()
		.min(6, "password must be atleast 6 characters")
		.max(20, "name must be atmost 20 characters"),
});

type FormData = z.infer<typeof FormSchema>;

type ServerEr = { msg: string };

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

	// callback after user is succesfully created
	const onSuccess = (res: CreateUser) => {
		setUserData(res);
	};

	// create user
	const { data, isLoading, isError, mutate } = useCreatUserQuery(onSuccess);

	if (isError) {
		toast.error("user already exists", {
			delay: 1000 * 10,
		});
	}

	if (data) {
		toast.success(
			`user with id : ${data.user._id} succesfully created and name ${data.user.name}`
		);
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
