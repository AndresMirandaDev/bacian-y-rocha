import React from 'react';
import prisma from '../../../../../prisma/client';
import { notFound } from 'next/navigation';
import WorkOrderForm from '../../WorkOrderForm';
import { StakeholderType } from '@prisma/client';

interface Params {
  params: { id: string };
}

const EditWorkOrderPage = async ({ params }: Params) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: params.id },
  });
  const clients = await prisma.stakeholders.findMany({
    where: { type: StakeholderType.CLIENT },
  });

  const saleOrders = await prisma.saleOrder.findMany();

  const positions = await prisma.position.findMany();

  if (!workOrder) return notFound();
  return (
    <WorkOrderForm
      workOrder={workOrder}
      saleOrders={saleOrders}
      clients={clients}
      positions={positions}
    />
  );
};

export default EditWorkOrderPage;
