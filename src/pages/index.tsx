import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React from "react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor : null as null | string
  });
  const [{data, fetching}] = usePostsQuery({
    variables
  });
  console.log("variables" ,variables)
  if(!fetching && !data) {
    return <div> query failed</div>
  }
  
  return (
    <Layout>
      <Flex align="center">
        <Heading>
          LiReddit
        </Heading>
          <NextLink href="/create-post">
            <Link ml="auto">
            create post
            </Link>
          </NextLink>
      </Flex>
      {!data && fetching ? (
      <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          { data!.posts.posts.map( p => (
            <Box p={5} key={p.id} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading> 
            <Text>{p.creator.username}</Text>
            <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          )) }
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button onClick={() => {
            // console.log("limit: ",variables.limit)
            // console.log("cursor: ",data.posts[data.posts.length - 1].createdAt)
            // console.log("data: ", data.posts[data.posts.length - 1])
            setVariables(
              {
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              }
            )
          }} isLoading={fetching} m='auto' my={8}>
            load more
          </Button>
        </Flex>
      ): null}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient,{  ssr:true })(Index);
