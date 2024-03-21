import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import SaleOrderForm from '../../SaleOrderForm';
import { StakeholderType } from '@prisma/client';

interface Params {
  params: { id: string };
}

const getProviders = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/providers`,
    {
      cache: 'no-store',
    }
  );

  const providers = await res.json();

  return providers.body;
};

const EditSaleOrderPage = async ({ params }: Params) => {
  const saleOrder = await prisma.saleOrder.findUnique({
    where: { id: params.id },
  });
  const providers = await getProviders();

  if (!saleOrder) return notFound();
  return <SaleOrderForm saleOrder={saleOrder} providers={providers} />;
};

export default EditSaleOrderPage;
