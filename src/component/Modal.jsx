import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Flex,
	Box,
	Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import millify from "millify";

import { ModalState } from "../recoil/modalState";
import { VideoState } from "../recoil/modalState";

const ModalVideo = () => {
	const [trailer, setTrailer] = useState("");
	const [genres, setGenres] = useState([]);
	const [data, setData] = useState();

	const [open, setOpen] = useRecoilState(ModalState);
	const [video, setVideo] = useRecoilState(VideoState);

	console.log({ data });
	//Fetch video function
	const fetchVideo = async () => {
		const data = await fetch(
			`https://api.themoviedb.org/3/${video?.media_type === "tv" ? "tv" : "movie"}/${video?.id}?api_key=${
				process.env.NEXT_PUBLIC_API_KEY
			}&language=en-US&append_to_response=videos`
		).then((res) => res.json());
		console.log({ data });
		if (data?.videos) {
			const index = data?.videos.results.findIndex((video) => video.type === "Trailer");
			// console.log({ index });
			setData(data);
			setTrailer(data?.videos?.results[index]?.key);
		}
		if (data?.genres) {
			setGenres(data?.genres);
		}
	};

	useEffect(() => {
		if (!video) return;
		fetchVideo();
	}, [video]);
	//===================================

	return (
		<>
			<Modal
				isOpen={open}
				onClose={() => setOpen(false)}
				size={{ base: "md", md: "md", lg: "lg", xl: "xl" }}
				isCentered
				motionPreset="scale"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton fontSize="25px" color="white" />
					<ModalBody bg="black">
						<Flex direction="column" justify="center" align="center" bg="black">
							<Box w={{ base: "410px", md: "800px", xl: "1600px" }} h={{ base: "320px", md: "600px", xl: "800px" }}>
								<ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`} width="100%" height="100%" playing />
							</Box>
							<Flex color="white" gap="2">
								<Flex direction="column" fontWeight="600" w={{ base: "100%", md: "20%" }}>
									{/* left */}
									<Text>Ngày ra mắt: {data?.release_date || data?.frist_air_date}</Text>
									<Text>Độ dài phim: {data?.runtime} phút</Text>
									<Text>Kinh Phí: ${millify(data?.budget)}</Text>
									<Text>Doanh Thu: ${millify(data?.revenue)} </Text>
									<Text>Quốc gia sản xuất: {data?.production_countries[0].name}</Text>
									<Flex gap="2">
										<Text>Thể Loại:</Text>
										{genres?.map((g, _i) => (
											<Text key="_i"> {g.name} </Text>
										))}
									</Flex>
								</Flex>
								<Flex direction="column" w="80%" display={{ base: "none", md: "flex" }}>
									<Text fontSize="20px">{data?.overview}</Text>
								</Flex>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalVideo;
