import {
  ApolloProvider as Provider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { auth } from "./firebase/config";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
});

const authLink = setContext(async () => {
  const token = await auth.currentUser?.getIdToken(true);
  console.log(token)
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return { headers };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export const ApolloProvider = ({ children }) => {
  return <Provider client={apolloClient}>{children}</Provider>;
};