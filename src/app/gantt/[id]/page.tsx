import React from 'react';
import prisma from '../../../../prisma/client';
import GanttChart from '../GanttChart';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

const WorkOrderGantt = async ({ params }: Params) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: params.id },
  });

  if (!workOrder) return notFound();

  return <GanttChart workOrder={workOrder} />;
};

export default WorkOrderGantt;
