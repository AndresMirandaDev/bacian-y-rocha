import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import { Box, Card } from '@radix-ui/themes';
import UserForm from '../../UserForm';
interface Params {
  params: { id: string };
}

const EditUserPage = async ({ params }: Params) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  if (!user) return notFound();
  return (
    <Box className="p-3">
      <Card>
        <UserForm user={user} />
      </Card>
    </Box>
  );
};

export default EditUserPage;
