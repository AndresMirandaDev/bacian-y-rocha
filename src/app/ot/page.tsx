import React from 'react';
import { Card, Grid } from '@radix-ui/themes';
import prisma from '../../../prisma/client';
import { notFound } from 'next/navigation';
import WorkOrdersTable from './_otTables/WorkOrdersTable';

const WorkOrderPage = async () => {
  const workOrders = await prisma.workOrder.findMany();

  if (!workOrders) return notFound();
  return (
    <Grid className="p-3">
      <Card>
        <WorkOrdersTable workOrders={workOrders} />
      </Card>
    </Grid>
  );
};

export default WorkOrderPage;
