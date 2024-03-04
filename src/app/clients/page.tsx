import { Button, Card, Flex, Grid } from '@radix-ui/themes';
import React from 'react';
import StakeHolderTable from '../components/StakeHolderTable';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';
import { Toaster } from 'react-hot-toast';

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

const ClientsPage = async () => {
  const providers = await getClients();

  return (
    <>
      <Grid className="p-3" gap="4">
        <Flex>
          <Button>
            <PlusIcon />
            <Link href="/clients/new">Registrar nuevo cliente</Link>
          </Button>
        </Flex>
        <Card>
          <StakeHolderTable
            stakeholders={providers}
            title="Clientes"
            type="clients"
          />
        </Card>
      </Grid>
      <Toaster />
    </>
  );
};

export default ClientsPage;
