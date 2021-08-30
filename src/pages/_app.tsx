import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from '../generated/graphql';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(
              existing: PaginatedPosts | undefined, 
              incoming: PaginatedPosts
              ): PaginatedPosts {
                console.log(existing, incoming)
              return{
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              }
            }
          }
        }
      }
    }
  })
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
