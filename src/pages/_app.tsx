import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp
