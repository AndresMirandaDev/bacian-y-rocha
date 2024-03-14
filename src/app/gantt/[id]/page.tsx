import React from 'react';
import prisma from '../../../../prisma/client';
import GanttChart from '../GanttChart';
import { notFound } from 'next/navigation';
import { Box, Flex } from '@radix-ui/themes';
import GanttChartX from '../_components/GanttChartX';
import TestChart from '../_components/TestChart';

interface Params {
  params: { id: string };
}

const WorkOrderGantt = async ({ params }: Params) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: params.id },
  });

  if (!workOrder) return notFound();

  return (
    <Flex
      // px={{ initial: '0', xs: '0', sm: '0', md: '0', lg: '5', xl: '5' }}
      className="p-3 w-full"
    >
      {/* <GanttChartX workOrder={workOrder} /> */}
      <TestChart workOrder={workOrder} />
    </Flex>
  );
};

export default WorkOrderGantt;
