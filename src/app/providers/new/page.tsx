import StakeholderForm from '@/app/components/StakeholderForm';
import { Box, Card, Grid, Text } from '@radix-ui/themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const NewProviderPage = () => {
  return (
    <>
      <Grid className="p-3">
        <Card>
          <Box className="mb-5 pl-2">
            <Text className="text-xl">Registrar nuevo Proveedor</Text>
          </Box>
          <StakeholderForm />
        </Card>
      </Grid>
    </>
  );
};

export default NewProviderPage;
