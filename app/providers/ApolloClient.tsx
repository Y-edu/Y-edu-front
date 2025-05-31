"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const graphQLUrl =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_PORT}/graphql`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`;

const client = new ApolloClient({
  uri: graphQLUrl,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
