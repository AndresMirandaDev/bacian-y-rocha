import { SaleOrder } from '@prisma/client';
import { PlusIcon } from '@radix-ui/react-icons';
import { Box, Button, Card, Grid } from '@radix-ui/themes';
import Link from 'next/link';
import { CiInboxOut } from 'react-icons/ci';
import { InfoCard } from '../_components/InfoCard';
import DeliveredOcTable from '../ocTables/DeliveredOcTable';
import EmittedOCTable from '../ocTables/EmittedOCTable';

const getSaleOrders = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/saleorders`,
    {
      cache: 'no-store',
    }
  );
  const quotes = await res.json();

  return quotes.body;
};

const EmittedWorkOrdersPage = async () => {
  const saleOrders = await getSaleOrders();

  return (
    <Grid className="p-3" gap="4">
      <InfoCard
        title="Ordenes de compra emitidas"
        icon={<CiInboxOut />}
        data={saleOrders.length}
      />
      <Box>
        <Button>
          <PlusIcon />
          <Link href={'/oc/new'}>Generar orden de compra</Link>
        </Button>
      </Box>
      <Card className="shadow-lg">
        <EmittedOCTable saleOrders={saleOrders} />
        <DeliveredOcTable
          saleOrders={saleOrders.filter(
            (order: SaleOrder) => order.status === 'ARRIVED'
          )}
        />
      </Card>
    </Grid>
  );
};

export default EmittedWorkOrdersPage;
