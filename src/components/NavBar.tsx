import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, {loading: logoutFetching}] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const{data, loading} = useMeQuery({
    skip: isServer(),
  });
  let body = null

  if (loading) {
    body = null
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}> Login </Link>
        </NextLink>
        <NextLink href="/register">
          <Link > Register </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center" >
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>create post</Button>
        </NextLink>
        <Box mr={2}>
          {data.me.username}
        </Box>
        <Button onClick={ async() => {
          await logout();
          await apolloClient.resetStore();
        }}
        isLoading={logoutFetching} 
        variant="link">logout</Button>
      </Flex>
    )
  }
    return (
      <Flex position="sticky" top={0} zIndex={2} bg="tan" p={4} alignItems="center">
        <Flex m='auto' flex={1} align="center" maxW={800}>
          <NextLink href='/'>
            <Link>
              <Heading>LiReddit</Heading>
            </Link>
          </NextLink>
          <Box ml={'auto'}>
            {body}
          </Box>
        </Flex>
      </Flex>
    )
}