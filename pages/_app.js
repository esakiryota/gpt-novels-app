// import '../styles/global.css';
import Root from "../components/navigation"
// import { ApolloClient,, InMemoryCache } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/ironSession/config";
import * as React from 'react';
import { ApolloProvider } from '../lib/apolloClient'
// import { initializeApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps: {session, ...pageProps} }) {
    let auth = false;
    const user = pageProps.user
    let accessToken = pageProps.accessToken
    if (pageProps.user !== undefined) {
        auth = true
    }

    return (
        <Root auth={auth} user={user}>
            <ApolloProvider>
                <Component {...pageProps} />
            </ApolloProvider>
        </Root>
    );
}