import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';
import NextLink from 'next/link'

export const ChangePassword: NextPage<{token: string} > = ({token}) => {
  const router = useRouter();
  const [,changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant="small">
      <Formik 
        initialValues={{ newPassword: ""}}
        onSubmit={async (values, {setErrors}) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if(response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      > 
        {({isSubmitting}) => (
          <Form>
            <InputField 
              name="newPassword"
              placeholder="new Password"
              label="New Password"
              type="password"
            />
            {tokenError ? (
            <Flex>
              <Box mr={2} color='red'>{tokenError}</Box>
              <NextLink href="/forgot-password">
                <Link>Click here to get a new one</Link>
              </NextLink>
            </Flex>
            
            ) : null }
            <Button 
                mt={4} 
                type="submit" 
                color='teal'
                isLoading={isSubmitting}
                >
                change
              </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>      
  )
}



ChangePassword.getInitialProps = ({query}) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword); 