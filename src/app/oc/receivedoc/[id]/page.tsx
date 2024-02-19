import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import ReceivedSaleOrderForm from '../../ReceivedSaleOrderForm';
import { Card } from '@radix-ui/themes';

interface Params {
  params: { id: string };
}

const ReceivedSaleOrderDetails = async ({ params }: Params) => {
  const saleOrder = await prisma.receivedSaleOrder.findUnique({
    where: { id: params.id },
  });

  if (!saleOrder) return notFound();
  return (
    <Card>
      <ReceivedSaleOrderForm receivedSaleOrder={saleOrder} />
    </Card>
  );
};

export default ReceivedSaleOrderDetails;
