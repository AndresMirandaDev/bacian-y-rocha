import React from 'react';
import SaleOrderForm from '../SaleOrderForm';
import prisma from '../../../../prisma/client';
import { StakeholderType } from '@prisma/client';

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

const NewSaleOrderPage = async () => {
  const providers = await getProviders();
  return <SaleOrderForm providers={providers} />;
};

export default NewSaleOrderPage;
