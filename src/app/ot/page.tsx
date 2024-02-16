import React from 'react';
import { Box, Button, Card, Grid } from '@radix-ui/themes';
import prisma from '../../../prisma/client';
import { notFound } from 'next/navigation';
import WorkOrdersTable from './_otTables/WorkOrdersTable';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

const WorkOrderPage = async () => {
  const workOrders = await prisma.workOrder.findMany();

  if (!workOrders) return notFound();
  return (
    <Grid className="p-3" gap="4">
      <Box>
        <Button>
          <PlusIcon />
          <Link href={'/ot/new'}>Registrar orden de trabajo</Link>
        </Button>
      </Box>
      <Card>
        <WorkOrdersTable workOrders={workOrders} />
      </Card>
    </Grid>
  );
};

export default WorkOrderPage;
