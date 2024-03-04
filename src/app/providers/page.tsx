import { Card, Grid } from '@radix-ui/themes';
import React from 'react';
import StakeHolderTable from '../components/StakeHolderTable';

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
    <Grid className="p-3">
      <Card>
        <StakeHolderTable stakeholders={providers} title="Proveedores" />
      </Card>
    </Grid>
  );
};

export default ProvidersPage;
