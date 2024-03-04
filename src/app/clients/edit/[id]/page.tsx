import React from 'react';
import prisma from '../../../../../prisma/client';
import StakeholderForm from '@/app/components/StakeholderForm';
import { Grid, Card, Box, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

const EditClientPage = async ({ params }: Params) => {
  const client = await prisma.stakeholders.findUnique({
    where: { id: params.id },
  });

  if (!client) return notFound();
  return (
    <>
      <Grid className="p-3">
        <Card>
          <Box className="mb-5 pl-2">
            <Text className="text-xl">Actualizar Cliente</Text>
          </Box>
          <StakeholderForm stakeholder={client} type="clients" />
        </Card>
      </Grid>
    </>
  );
};

export default EditClientPage;
