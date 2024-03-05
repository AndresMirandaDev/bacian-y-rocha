import React from 'react';
import SaleOrderForm from '../SaleOrderForm';
import prisma from '../../../../prisma/client';
import { StakeholderType } from '@prisma/client';

const NewSaleOrderPage = async () => {
  const providers = await prisma.stakeholders.findMany({
    where: { type: StakeholderType.PROVIDER },
  });
  return <SaleOrderForm providers={providers} />;
};

export default NewSaleOrderPage;
