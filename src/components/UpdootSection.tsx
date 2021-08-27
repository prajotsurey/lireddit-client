import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const  [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
  console.log(loadingState)
  const  [,vote] = useVoteMutation()
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick = { async() => {
          setLoadingState('updoot-loading')
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading')
        }}
        isLoading={loadingState === 'updoot-loading'}
        variant="unstyled"
        aria-label="updoot post"
        icon={<ChevronUpIcon />}/>
      {post.points}
      <IconButton
        onClick = { async() => {
          setLoadingState('downdoot-loading')
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading')
        }}
        isLoading={loadingState === 'downdoot-loading'}
        variant="unstyled"
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}/>
    </Flex>
  );
}