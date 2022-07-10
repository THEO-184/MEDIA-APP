import React from "react";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import TextField from "../../components/TextField";

const SignIn = () => {
	return (
		<Container>
			<Card title="Sign In" description="create your account" width="w-[400px]">
				<form>
					<TextField type={"text"} variant="filled" placeholder="Name" />
					<TextField type={"email"} variant="filled" placeholder="Email" />
					<TextField
						type={"password"}
						variant="filled"
						placeholder="Password"
					/>
					<Box className="flex items-center justify-center my-3">
						<Button variant="filled">SIGN UP</Button>
					</Box>
				</form>
			</Card>
		</Container>
	);
};

export default SignIn;
