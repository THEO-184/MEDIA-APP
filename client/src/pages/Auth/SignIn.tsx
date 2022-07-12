import React, { useState } from "react";
import { useMutation } from "react-query";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ====  LOCAL IMPORTS ====
import Box from "../../components/Box";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import { CreateUserProps } from "../../common/interfaces/api-interfaces";
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

const SignIn = () => {
	const [userData, setUserData] = useState<CreateUserProps>(
		{} as CreateUserProps
	);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(FormSchema),
	});

	// send data to backend
	const { isLoading, error, mutate } = useCreatUserQuery();

	if (error instanceof Error) {
		return <div>error occured: {error.message}</div>;
	}

	// send data to backend
	const onSubmit: SubmitHandler<FormData> = (data) => {
		setUserData(data);
		mutate(data);
	};

	return (
		<Container>
			<Card title="Sign In" description="create your account" width="w-[400px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField {...field} variant="filled" disabled={isLoading} />
						)}
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mb-1">{errors.name.message}</p>
					)}
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField {...field} variant="filled" disabled={isLoading} />
						)}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mb-1">{errors.email.message}</p>
					)}

					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField {...field} variant="filled" disabled={isLoading} />
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
		</Container>
	);
};

export default SignIn;
