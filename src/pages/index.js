import { Flex } from "@chakra-ui/react";
import Head from "next/head";

import Banner from "../component/Banner";
import Header from "../component/Header";
import Row from "../component/Row";
import requests from "../utils/requests";
import { baseurl } from "../constant/url";
import Modal from "../component/Modal";

export default function Home({
	netflixOriginals,
	trendingNow,
	topRated,
	actionMovies,
	comedyMovies,
	horrorMovies,
	romanceMovies,
	documentaries,
}) {
	// console.log("trending new:", trendingNow);
	return (
		<>
			<Head>
				<title>Netflix</title>
				<meta name="description" content="Web xem phim mới làm kk" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex direction="column" color="white" bgGradient="linear(to-r,red,green.400)">
				<Header />
				<Banner netflixOriginals={netflixOriginals} />
				<section>
					<Row title="Phim Nổi Bật" movies={trendingNow} />
					<Row title="Phim Được Đánh Giá Cao" movies={topRated} />
					<Row title="Phim Hành Động" movies={actionMovies} />
					{/* My List */}
					{/* {list.length > 0 && <Row title="My List" movies={list} />} */}

					<Row title="Phim Hài" movies={comedyMovies} />
					<Row title="Phim Kinh Dị" movies={horrorMovies} />
					<Row title="Phim Lãng Mạn" movies={romanceMovies} />
					<Row title="Phim Tài Liệu" movies={documentaries} />
				</section>
				<Modal />
			</Flex>
		</>
	);
}

export const getServerSideProps = async () => {
	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaries).then((res) => res.json()),
	]);
	// console.log("trending old:", trendingNow);
	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
		},
	};
};
