import StakeholderForm from '@/app/components/StakeholderForm';
import { Box, Card, Grid, Text } from '@radix-ui/themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const NewClientPage = () => {
  return (
    <>
      <Grid className="p-3">
        <Card>
          <Box className="mb-5 pl-2">
            <Text className="text-xl">Registrar nuevo cliente</Text>
          </Box>
          <StakeholderForm type="clients" />
        </Card>
      </Grid>
    </>
  );
};

export default NewClientPage;
