"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_SERVER_URL}:8181/graphql`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
