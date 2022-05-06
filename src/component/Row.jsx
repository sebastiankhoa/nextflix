import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Thumbnail from "./Thumbnail";

const Row = ({ title, movies }) => {
	const rowRef = useRef(null);
	const [isMove, setIsMove] = useState(false);

	const handleClick = (direction) => {
		setIsMove(true);
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;

			const scroll = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scroll, behavior: "smooth" });
		}
	};

	return (
		<Box ml={{ base: "3", md: "10" }} my={{ base: "2", md: "5" }}>
			<Text fontWeight="600" color="gray.200" fontSize={{ base: "15px", md: "25px" }}>
				{title}
			</Text>
			<Flex role="group" pos="relative" h={{ base: "100px", md: "160px" }}>
				<IconButton
					cursor="pointer"
					variant="unstyled"
					as={IoIosArrowBack}
					position="absolute"
					lef="0"
					top="0"
					bottom="0"
					m="auto"
					zIndex="40"
					opacity="0"
					_groupHover={{ opacity: "100%" }}
					size="md"
					onClick={() => handleClick("left")}
					display={isMove ? "inline" : "none"}
				/>
				<Flex gap="2" ref={rowRef} overflowX="scroll" overflowY="hidden" className="scrolling-section">
					{movies?.map((movie) => (
						<Thumbnail key={movie.id} movie={movie} />
					))}
				</Flex>
				<IconButton
					cursor="pointer"
					variant="unstyled"
					as={IoIosArrowForward}
					position="absolute"
					right="0"
					top="0"
					bottom="0"
					m="auto"
					zIndex="40"
					opacity="0"
					_groupHover={{ opacity: "100%" }}
					size="md"
					onClick={() => handleClick("right")}
				/>
			</Flex>
		</Box>
	);
};

export default Row;
