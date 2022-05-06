import { useState, useEffect } from "react";

import { Avatar, Box, Flex, Icon, Image, List, ListItem, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
	const router = useRouter();
	const { logOut } = useAuth();

	//check scroll
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Flex
			bg={scroll && "blackAlpha.400"}
			justify="space-between"
			zIndex="50"
			align="center"
			pos="fixed"
			top="0"
			w="100%"
			px={{ base: "4", lg: "10" }}
			py={{ base: "4", lg: "6" }}
		>
			<Flex>
				<Image
					w={{ base: "60px", md: "100px" }}
					h={{ base: "40px", md: "80px" }}
					objectFit="contain"
					src="/images/netflix_logo.png"
					alt="logo"
					ml="3"
				/>
				<List ml="5" display={{ base: "none", md: "flex" }} gap="5" alignItems="center">
					<ListItem cursor="pointer" _hover={{ color: "gray.500" }}>
						Home
					</ListItem>
					<ListItem cursor="pointer" _hover={{ color: "gray.500" }}>
						TV Shows
					</ListItem>
					<ListItem cursor="pointer" _hover={{ color: "gray.500" }}>
						Movies
					</ListItem>
					<ListItem cursor="pointer" _hover={{ color: "gray.500" }}>
						New & Popular
					</ListItem>
					<ListItem cursor="pointer" _hover={{ color: "gray.500" }}>
						My List
					</ListItem>
				</List>
			</Flex>
			<Flex align="center" gap="3" mr="3">
				<Icon as={FiSearch} display={{ base: "none", md: "inline" }} />
				<Text fontWeight="700" display={{ base: "none", lg: "inline" }}>
					KID
				</Text>
				<Icon as={MdNotificationsNone} />
				<Avatar
					src="https://64.media.tumblr.com/6294cb9261433d26fd9cc4bcd83f566f/25f2132d7cfffede-5e/s1280x1920/72d1c58982b1f98802c7ed058419d934ea53baf9.jpg"
					cursor="pointer"
					w={{ base: "25px", md: "60px" }}
					h={{ base: "25px", md: "60px" }}
					onClick={() => logOut()}
				/>
			</Flex>
		</Flex>
	);
};

export default Header;
