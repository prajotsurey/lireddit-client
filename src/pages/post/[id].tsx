import { Box } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { withApollo } from "../../utils/withApollo";
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
  const {data, error,loading} = useGetPostFromUrl();
  
  if (loading) {
    return(
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if(error) {
    return(
      <div>
        {error.message}
      </div>
    )
  }

  if(!data?.post) {
    return(
      <Layout>
        <Box>
          Could not find post
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading mb={4}>
        {data?.post?.title}
      </Heading>
      <Box mb={4}> {data?.post?.text} </Box>
      <EditDeletePostButtons 
        id={data.post.id} 
        creatorId={data.post.creator.id}
        /> 
    </Layout>
  );
}


export default withApollo({ ssr: true })(Post);