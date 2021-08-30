import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/dist/client/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useState } from 'react';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
    return (
      <Wrapper variant="small">
        <Formik 
          initialValues={{ email: ""}}
          onSubmit={async (values) => {
              await forgotPassword({variables: values});
              setComplete(true);
          }}
        > 
          {({isSubmitting}) => complete ? 
          <Box>
            If an account with that email exists we have sent you an email
          </Box> 
          : (
            <Form>
              <InputField 
                name="email"
                placeholder="Email"
                label="email"
              />
              <Button 
                mt={4} 
                type="submit" 
                color='teal'
                isLoading={isSubmitting}
                >
                forgot password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>      
    );
}

export default ForgotPassword ;