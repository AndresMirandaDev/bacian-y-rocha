import React from 'react';
import WorkOrderForm from '../WorkOrderForm';
import prisma from '../../../../prisma/client';
import { StakeholderType } from '@prisma/client';

const NewWorkOrderPage = async () => {
  const saleOrders = await prisma.saleOrder.findMany();
  const clients = await prisma.stakeholders.findMany({
    where: { type: StakeholderType.CLIENT },
  });
  return <WorkOrderForm saleOrders={saleOrders} clients={clients} />;
};

export default NewWorkOrderPage;
