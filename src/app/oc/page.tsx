import React from 'react';
import prisma from '../../../prisma/client';
import SaleOrdersOverview from './SaleOrdersOverview';
import { Box, Card, Flex, Grid } from '@radix-ui/themes';
import ReceivedOCTable from './ocTables/ReceivedOCTable';
import Pagination from '../components/Pagination';
import EmittedOCTable from './ocTables/EmittedOCTable';
import DeliveredOcTable from './ocTables/DeliveredOcTable';
import { Toaster } from 'react-hot-toast';
import SaleOrderActions from './SaleOrderActions';
import { SaleOrder } from '@prisma/client';

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

const OCPage = async () => {
  const saleOrders = await getSaleOrders();
  const receivedSaleOrders = await getReceivedSaleOrders();

  return (
    <>
      <Grid gap="4">
        <Box>
          <SaleOrdersOverview
            saleOrders={saleOrders}
            saleOrdersReceived={receivedSaleOrders}
          />
        </Box>
        <Flex
          gap="4"
          direction={{
            initial: 'column',
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
        >
          <SaleOrderActions />
        </Flex>
        <Card>
          <Grid
            columns={{
              initial: '1',
              xs: '1',
              sm: '1',
              md: '1',
              lg: '2',
              xl: '2',
            }}
            gap="3"
          >
            <Box>
              <EmittedOCTable saleOrders={saleOrders} />
            </Box>
            <Box>
              <ReceivedOCTable receivedSaleOrders={receivedSaleOrders} />
            </Box>
          </Grid>
        </Card>
        <Card>
          <Grid>
            <Box>
              <DeliveredOcTable
                saleOrders={saleOrders.filter(
                  (order: SaleOrder) => order.status === 'ARRIVED'
                )}
              />
            </Box>
          </Grid>
        </Card>
      </Grid>
      <Toaster />
    </>
  );
};

export default OCPage;
