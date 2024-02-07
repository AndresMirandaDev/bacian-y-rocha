import { notFound } from 'next/navigation';
import React from 'react';

interface Params {
  params: { id: string };
}

const WorkOrderDetails = async ({ params }: Params) => {
  const workOrder = await prisma?.workOrder.findUnique({
    where: { id: params.id },
  });

  if (!workOrder) return notFound();

  return <div>{workOrder.number}</div>;
};

export default WorkOrderDetails;
