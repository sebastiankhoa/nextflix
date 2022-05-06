import React, { useState } from "react";
import Head from "next/head";
import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
	const router = useRouter();

	const { signUp, logIn } = useAuth();

	const [login, setLogin, loading] = useState(false);

	//react form hook
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async ({ email, password }) => {
		if (login) {
			await logIn(email, password);
		} else {
			await signUp(email, password);
		}
	};
	//=============================================

	return (
		<>
			<Head>
				<title>Netflix Login</title>
			</Head>
			<Flex
				h="100vh"
				justify="center"
				align="center"
				backgroundImage="/images/netflix_login.jpeg"
				backgroundSize="cover"
			>
				<Image
					src="/images/netflix_logo.png"
					alt="logo"
					pos="absolute"
					top="0"
					left="2"
					w={{ base: "60px", md: "100px" }}
					h={{ base: "40px", md: "80px" }}
					objectFit="contain"
					cursor="pointer"
					onClick={() => router.push("/")}
				/>
				<Flex
					direction="column"
					color="white"
					w={{ base: "300px", md: "600px" }}
					h={{ base: "350px", md: "400px" }}
					bg="blackAlpha.600"
					px="5"
					rounded="xl"
					justify="center"
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Text fontSize="4xl" fontWeight="700">
							Sign In
						</Text>
						<Flex gap="4" direction="column">
							<Input
								id="email"
								type="email"
								placeholder="Email"
								bg="gray.600"
								_focus={{ bg: "white", color: "gray.700", border: "4px solid", borderColor: "green" }}
								_hover={{ bg: "white", color: "blue" }}
								{...register("email", { required: true })}
							/>
							{errors.email && (
								<Text fontSize="13pt" color="orange.500">
									Email không được để trống
								</Text>
							)}
							<Input
								id="password"
								type="password"
								placeholder="Mật khẩu"
								bg="gray.600"
								_focus={{ bg: "white", color: "gray.700", border: "4px solid", borderColor: "green" }}
								_hover={{ bg: "white", color: "blue" }}
								{...register("password", { required: true })}
							/>
							{errors.password && (
								<Text fontSize="13pt" color="orange.500">
									Mật khẩu phải dài từ 4 đến 60 ký tự
								</Text>
							)}
							<Button
								type="submit"
								bg="#e50914"
								color="white"
								_hover={{ opacity: "80%" }}
								onClick={() => setLogin(true)}
								isLoading={loading}
							>
								Sign In
							</Button>
							<Flex align="center" gap="2">
								<Text fontWeight="600" _hover={{ color: "green.200" }}>
									New to Netflix?
								</Text>
								<Button variant="unstyled" type="submit" onClick={() => setLogin(false)} isLoading={loading}>
									Signup now
								</Button>
							</Flex>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</>
	);
};

export default LoginPage;
