import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import SaleOrderForm from '../../SaleOrderForm';

interface Params {
  params: { id: string };
}

const EditSaleOrderPage = async ({ params }: Params) => {
  const saleOrder = await prisma.saleOrder.findUnique({
    where: { id: params.id },
  });
  if (!saleOrder) return notFound();
  return <SaleOrderForm />;
};

export default EditSaleOrderPage;
