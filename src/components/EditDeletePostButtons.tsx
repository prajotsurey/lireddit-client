import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number,
  creatorId: number,
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost ] = useDeletePostMutation()
  
  if(meData?.me?.id !== creatorId) {
    return null
  }
  
  return (
    <Box>
      <NextLink href={`/post/edit/${id}`}>
        <IconButton
          mr={4}
          aria-label="Edit Post"
          icon={<EditIcon/>}
        />
      </NextLink>
      <IconButton 
        aria-label="Delete Post"
        icon={<DeleteIcon/>}
        onClick={() => {
          deletePost({variables:{ id }, update: (cache) => {
            cache.evict({id: 'Post:' + id});
          } });
        }}
      />
    </Box>
  );
}