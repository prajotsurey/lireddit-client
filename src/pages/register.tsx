import React from 'react'
import {Formik, Form} from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { withApollo } from "../utils/withApollo";



interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
    return (
      <Wrapper variant="small">
        <Formik 
          initialValues={{ email: "", username: "", password: ""}}
          onSubmit={async (values, {setErrors}) => {
            const response = await register({
              variables: { options: values},
              update:(cache, {data}) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.register.user,
                  },
                })
              }
            });
            if(response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        > 
          {({isSubmitting}) => (
            <Form>
              <InputField 
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField 
                  name="email"
                  placeholder="email"
                  label="email"
                />
              </Box>
              <Box mt={4}>
                <InputField 
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
                />
              </Box>
              <Button 
                mt={4} 
                type="submit" 
                color='teal'
                isLoading={isSubmitting}
                >
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>      
    )
}

export default withApollo({ ssr: false})(Register);