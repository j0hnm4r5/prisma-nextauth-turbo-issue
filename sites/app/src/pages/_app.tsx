import "../styles/globals.css";

import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";

import { api } from "../utils/api";

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
	doesNotRequireAuth?: boolean;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
