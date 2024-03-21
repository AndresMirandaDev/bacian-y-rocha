import React from 'react';
import WorkOrderForm from '../WorkOrderForm';
import prisma from '../../../../prisma/client';
import { StakeholderType } from '@prisma/client';

const getClients = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/clients`,
    {
      cache: 'no-store',
    }
  );

  const clients = await res.json();

  return clients.body;
};

const NewWorkOrderPage = async () => {
  const saleOrders = await prisma.saleOrder.findMany();
  const clients = await getClients();
  const positions = await prisma.position.findMany();

  return (
    <WorkOrderForm
      saleOrders={saleOrders}
      clients={clients}
      positions={positions}
    />
  );
};

export default NewWorkOrderPage;
