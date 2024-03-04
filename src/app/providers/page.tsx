import { Button, Card, Flex, Grid } from '@radix-ui/themes';
import React from 'react';
import StakeHolderTable from '../components/StakeHolderTable';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';
import { Toaster } from 'react-hot-toast';

const getProviders = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/providers`,
    {
      cache: 'no-store',
    }
  );

  const providers = await res.json();

  return providers.body;
};

const ProvidersPage = async () => {
  const providers = await getProviders();

  return (
    <>
      <Grid className="p-3" gap="4">
        <Flex>
          <Button>
            <PlusIcon />
            <Link href="/providers/new">Registrar nuevo proveedor</Link>
          </Button>
        </Flex>
        <Card>
          <StakeHolderTable stakeholders={providers} title="Proveedores" />
        </Card>
      </Grid>
      <Toaster />
    </>
  );
};

export default ProvidersPage;
