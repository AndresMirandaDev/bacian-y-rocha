import React from 'react';
import UserForm from '../UserForm';
import { Box, Card } from '@radix-ui/themes';

const RegisterNewUser = () => {
  return (
    <Box className="p-3">
      <Card>
        <UserForm />
      </Card>
    </Box>
  );
};

export default RegisterNewUser;
