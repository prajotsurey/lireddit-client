import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql'
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';

const createPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
    return (
      <Layout variant="small">
        <Formik 
          initialValues={{ title: "", text: ""}}
          onSubmit={async (values, {setErrors}) => {
            const {error} = await createPost({ input : values });
            if (error?.message.includes("not authenticated")) {
              router.push('/login');
            } else {
              router.push('/')
            }
          }}
        > 
          {({isSubmitting}) => (
            <Form>
              <InputField 
                name="title"
                placeholder="title"
                label="title"
              />
              <Box mt={4}>
                <InputField 
                  textarea
                  name="text"
                  placeholder="text..."
                  label="Body"
                />
              </Box>
              <Button 
                mt={4} 
                type="submit" 
                color='teal'
                isLoading={isSubmitting}
                >
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(createPost) ;