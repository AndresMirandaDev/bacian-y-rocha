import React from 'react';
import WorkOrderForm from '../WorkOrderForm';
import prisma from '../../../../prisma/client';

const NewWorkOrderPage = async () => {
  const saleOrders = await prisma.saleOrder.findMany();
  return <WorkOrderForm saleOrders={saleOrders} />;
};

export default NewWorkOrderPage;
