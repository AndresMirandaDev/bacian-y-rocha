import React from 'react';
import prisma from '../../../../prisma/client';
import SaleOrderDetails from './SaleOrderDetails';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

const OCDetailsPage = async ({ params }: Params) => {
  const saleOrder = await prisma.saleOrder.findUnique({
    where: { id: params.id },
  });
  if (!saleOrder) return notFound();
  return <SaleOrderDetails saleOrder={saleOrder} />;
};

export default OCDetailsPage;
