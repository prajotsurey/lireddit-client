import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react'
import React from 'react'
import {Provider, createClient} from 'urql';
import theme from '../theme'

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include"
  }
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp
