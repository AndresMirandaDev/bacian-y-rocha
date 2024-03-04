import React from 'react';
import prisma from '../../../../../prisma/client';
import StakeholderForm from '@/app/components/StakeholderForm';
import { Grid, Card, Box, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

const EditProviderPage = async ({ params }: Params) => {
  const provider = await prisma.stakeholders.findUnique({
    where: { id: params.id },
  });

  if (!provider) return notFound();
  return (
    <>
      <Grid className="p-3">
        <Card>
          <Box className="mb-5 pl-2">
            <Text className="text-xl">Actualizar Proveedor</Text>
          </Box>
          <StakeholderForm stakeholder={provider} />
        </Card>
      </Grid>
    </>
  );
};

export default EditProviderPage;
