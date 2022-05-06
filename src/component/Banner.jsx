import { Button, Flex, Image, Img, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSetRecoilState, useRecoilState } from "recoil";

import { baseurl } from "../constant/url";
import { ModalState } from "../recoil/modalState";
import { VideoState } from "../recoil/modalState";

const Banner = ({ netflixOriginals }) => {
	const [movie, setMovie] = useState(null);

	const setModal = useSetRecoilState(ModalState);
	const setVideo = useSetRecoilState(VideoState);

	useEffect(() => {
		const randomMovie = netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];
		setMovie(randomMovie);
	}, [netflixOriginals]);

	return (
		<Flex>
			<Img
				src={`${baseurl}/${movie?.backdrop_path || movie?.poster_path}`}
				alt="banner"
				objectFit="cover"
				w="100%"
				h="80vh"
			/>
			<Flex direction="column" zIndex="99" pos="absolute" left="10" top="250px">
				<Text fontSize={{ base: "25px", md: "40px", lg: "70px" }} fontWeight="900" textShadow="dark-lg">
					{movie?.title || movie?.name || movie?.orrginal_name}
				</Text>
				<Text fontSize={{ base: "11px", md: "18px" }} w={{ base: "300px", md: "500px" }}>
					{movie?.overview}
				</Text>
				<Flex gap="3" mt="2">
					<Button
						bg="white"
						size={{ base: "sm" }}
						color="black"
						_hover={{ opacity: "50%" }}
						fontSize={{ base: "18px", md: "25px" }}
						p="10px 8px"
					>
						<BsFillPlayFill /> Play
					</Button>
					<Button
						size={{ base: "sm" }}
						color="white"
						bg="gray.600"
						gap="1"
						_hover={{ opacity: "50%" }}
						fontSize={{ base: "18px", md: "25px" }}
						p="10px 8px"
						onClick={() => {
							setModal(true);
							setVideo(movie);
						}}
					>
						<AiOutlineInfoCircle fontSize="30px" />
						More Info
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Banner;
