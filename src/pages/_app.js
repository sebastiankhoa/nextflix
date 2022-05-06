import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import { AuthProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<RecoilRoot>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
