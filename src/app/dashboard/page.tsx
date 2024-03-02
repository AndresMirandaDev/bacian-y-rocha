import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { Card, Flex, Grid } from '@radix-ui/themes';
import WorkOrdersPieChart from '../ot/_components/WorkOrdersPieChart';
import WorkOrdersBalanceChart from './charts/WorkOrdersBalanceChart';

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

const Dashboard = async () => {
  const workOrders = await getWorkOrders();
  return (
    <Grid className="p-3">
      <Card>
        <WorkOrdersBalanceChart workOrders={workOrders} />
      </Card>
    </Grid>
  );
};

export default Dashboard;
