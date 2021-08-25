import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{data}] = usePostsQuery({
    variables: {
      limit: 10
    },
  });
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>
         create post
        </Link>
      </NextLink>
      {!data ? (
      <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          { data.posts.map( p => (
            <Box p={5} key={p.id} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          )) }
        </Stack>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient,{  ssr:true })(Index);
