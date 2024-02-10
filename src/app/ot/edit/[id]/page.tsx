import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import WorkOrderForm from '../../WorkOrderForm';

interface Params {
  params: { id: string };
}

const EditWorkOrderPage = async ({ params }: Params) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: params.id },
  });

  const saleOrders = await prisma.saleOrder.findMany();

  if (!workOrder) return notFound();
  return <WorkOrderForm workOrder={workOrder} saleOrders={saleOrders} />;
};

export default EditWorkOrderPage;
