import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { Box, Button, Card, Flex, Grid } from '@radix-ui/themes';
import WorkOrdersPieChart from '../ot/_components/WorkOrdersPieChart';
import WorkOrdersBalanceChart from './charts/WorkOrdersBalanceChart';
import QuoteWaitingTable from '../quotes/QuoteWaitingTable';
import { Quote, WorkOrder } from '@prisma/client';

const getWorkOrders = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/workorders`,
    {
      cache: 'no-store',
    }
  );

  const quotes = await res.json();

  return quotes.body;
};

const getQuotes = async () => {
  const res = await fetch(`https://bacian-y-rocha-next.vercel.app/api/quotes`, {
    cache: 'no-store',
  });

  const quotes = await res.json();

  return quotes.body;
};

const Dashboard = async () => {
  const workOrders = await getWorkOrders();
  const quotes = await getQuotes();
  return (
    <Grid className="p-3" gap="4">
      <Box>
        <Card>
          <WorkOrdersBalanceChart workOrders={workOrders} />
        </Card>
      </Box>
      <Grid
        columns={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
        gap="4"
      >
        <Card>
          <QuoteWaitingTable
            quotes={quotes.filter((q: Quote) => q.status === 'PENDING')}
          />
        </Card>
        <Card>
          <WorkOrdersPieChart
            delayed={workOrders.filter((wo: WorkOrder) => {
              if (wo.endDate) {
                const estimatedEndDate = new Date(wo.estimatedDate);
                const endDate = new Date(wo.endDate);
                return endDate > estimatedEndDate;
              }
            })}
            fullfilled={workOrders.filter((wo: WorkOrder) => {
              if (wo.endDate) {
                const estimatedEndDate = new Date(wo.estimatedDate);
                const endDate = new Date(wo.endDate);
                return endDate <= estimatedEndDate;
              }
            })}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
