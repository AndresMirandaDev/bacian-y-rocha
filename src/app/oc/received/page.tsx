import { Box, Button, Card, Grid, Link, Text } from '@radix-ui/themes';
import React from 'react';
import ReceivedOCTable from '../ocTables/ReceivedOCTable';
import { InfoCard } from '../_components/InfoCard';
import { CiInboxIn } from 'react-icons/ci';
import { FaFilePdf } from 'react-icons/fa6';

const getReceivedSaleOrders = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/receivedSaleOrders`,
    {
      cache: 'no-store',
    }
  );
  const quotes = await res.json();

  return quotes.body;
};

const ReceivedWorkOrdersPage = async () => {
  const saleOrders = await getReceivedSaleOrders();
  return (
    <Grid className="p-3" gap="4">
      <InfoCard
        title="Ordenes de compra recibidas"
        icon={<CiInboxIn />}
        data={saleOrders.length}
      />
      <Box>
        <Button>
          <FaFilePdf />
          <Link href={'/oc/new/receivedoc'}>
            <Text className="text-white">Registrar orden de compra</Text>
          </Link>
        </Button>
      </Box>
      <Card>
        <ReceivedOCTable receivedSaleOrders={saleOrders} />
      </Card>
    </Grid>
  );
};

export default ReceivedWorkOrdersPage;
