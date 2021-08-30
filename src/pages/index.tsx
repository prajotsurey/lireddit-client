import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React, { useState } from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor : null as null | string
  });
  const { data: meData } = useMeQuery();
  const {data, error,loading} = usePostsQuery({
    variables
  });



  if(!loading && !data) {
    return (
    <div> 
      <div>{error?.message}</div>
      
    </div>
    )
  }
  
  return (
    <Layout>
      {!data && loading ? (
      <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          { data!.posts.posts.map( p =>
          !p ? null : (
            <Flex p={5} key={p.id} shadow="md" borderWidth="1px">
              <UpdootSection post={p}/>
              <Box flex={1}>
                <NextLink href={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading> 
                  </Link>
                </NextLink>
                <Text>{p.creator.username}</Text>
                <Flex align="center">
                  <Text flex={1} mt={4}>{p.textSnippet}</Text>
                  <Box ml='auto'>
                    <EditDeletePostButtons 
                      id={p.id}
                      creatorId={p.creator.id}
                      />
                  </Box>
                </Flex>
              </Box>
            </Flex>
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
          }} isLoading={loading} m='auto' my={8}>
            load more
          </Button>
        </Flex>
      ): null}
    </Layout>
  )
}

export default Index;
