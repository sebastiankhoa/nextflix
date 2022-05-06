import { Box, Flex, Img } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useSetRecoilState, useRecoilState } from "recoil";

import { baseurl } from "../constant/url";
import { ModalState } from "../recoil/modalState";
import { VideoState } from "../recoil/modalState";

const Thumbnail = ({ movie }) => {
	// console.log({ movie });
	const setModalState = useSetRecoilState(ModalState);
	const [video, setVideo] = useRecoilState(VideoState);

	return (
		<Box
			minW={{ base: "160px", md: "256px" }}
			minH={{ base: "90px", md: "144px" }}
			cursor="pointer"
			as={motion.div}
			whileHover={{ scale: 1.1 }}
			transition="0.3s ease-in-out"
			onClick={() => {
				setModalState((prev) => !prev);
				setVideo(movie);
			}}
		>
			<Img src={`${baseurl}/${movie?.backdrop_path || movie?.poster_path}`} w="100%" alt="poster" objectFit="cover" />
		</Box>
	);
};

export default Thumbnail;
