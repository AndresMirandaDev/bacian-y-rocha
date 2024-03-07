import { Box } from '@radix-ui/themes';
import React from 'react';
import PositionForm from '../../_components/PositionForm';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

const EditPositionPage = async ({ params }: Params) => {
  const position = await prisma.position.findUnique({
    where: { id: params.id },
  });

  if (!position) return notFound();
  return (
    <Box className="p-3">
      <PositionForm position={position} />
    </Box>
  );
};

export default EditPositionPage;
