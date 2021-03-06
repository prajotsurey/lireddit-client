import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withApollo } from "../utils/withApollo";

import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const createPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
    return (
      <Layout variant="small">
        <Formik 
          initialValues={{ title: "", text: ""}}
          onSubmit={async (values, {setErrors}) => {
            const { errors } = await createPost({
              variables: { input : values },
              update: (cache) => {
                cache.evict({ fieldName: 'posts' })
              },
            });
            if (!errors) {
              router.push('/')
            }
            }
          }
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

export default withApollo({ ssr: false})(createPost) ;