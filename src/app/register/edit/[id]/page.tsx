import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import { Card } from '@radix-ui/themes';
import UserForm from '../../UserForm';
interface Params {
  params: { id: string };
}

const EditUserPage = async ({ params }: Params) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  if (!user) return notFound();
  return (
    <Card>
      <UserForm user={user} />
    </Card>
  );
};

export default EditUserPage;
