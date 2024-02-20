import React from 'react';
import prisma from '../../../../prisma/client';
import { notFound } from 'next/navigation';
import UserDetails from './UserDetails';

interface Params {
  params: { id: string };
}

const UserDetailsPage = async ({ params }: Params) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  if (!user) return notFound();

  return <UserDetails user={user} />;
};

export default UserDetailsPage;
