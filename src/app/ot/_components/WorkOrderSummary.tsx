'use client';
import { Box, Card, Grid, Text } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { WorkOrder } from '@prisma/client';
import WorkOrderSummaryTable from './WorkOrderSummaryTable';
import WorkOrdersPieChart from './WorkOrdersPieChart';

interface Props {
  workOrders: WorkOrder[];
}

const WorkOrderSummary = ({ workOrders }: Props) => {
  const [fullfilled, setFullfilled] = useState<WorkOrder[]>([]);
  const [delayed, setDelayed] = useState<WorkOrder[]>([]);

  const getFullfilled = () => {
    const fulfilledWorkOrders = workOrders.filter((wo) => {
      if (wo.endDate) {
        const estimatedEndDate = new Date(wo.estimatedDate);
        const endDate = new Date(wo.endDate);
        return endDate <= estimatedEndDate;
      }
    });
    setFullfilled(fulfilledWorkOrders);
  };
  const getDelayed = () => {
    const delayedWorkOrders = workOrders.filter((wo) => {
      if (wo.endDate) {
        const estimatedEndDate = new Date(wo.estimatedDate);
        const endDate = new Date(wo.endDate);
        return endDate > estimatedEndDate;
      }
    });
    setDelayed(delayedWorkOrders);
  };

  useEffect(() => {
    getFullfilled();
    getDelayed();
  }, []);

  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">Recuento de ordenes de compra</Text>
      </Box>
      <Grid
        columns={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
        gap="4"
      >
        <Box>
          <Box>
            <WorkOrderSummaryTable state="fullfilled" workOrders={fullfilled} />
          </Box>
          <Box>
            <WorkOrderSummaryTable state="delayed" workOrders={delayed} />
          </Box>
        </Box>
        <Card className="shadow-lg">
          <WorkOrdersPieChart fullfilled={fullfilled} delayed={delayed} />
        </Card>
      </Grid>
    </>
  );
};

export default WorkOrderSummary;
