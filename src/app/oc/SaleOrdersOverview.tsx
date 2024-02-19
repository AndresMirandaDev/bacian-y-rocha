import { ReceivedSaleOrder, SaleOrder } from '@prisma/client';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import React, { ReactNode } from 'react';
import { CiInboxIn, CiInboxOut } from 'react-icons/ci';

interface Props {
  saleOrdersReceived: ReceivedSaleOrder[];
  saleOrders: SaleOrder[];
}

const SaleOrdersOverview = ({ saleOrdersReceived, saleOrders }: Props) => {
  return (
    <Grid
      columns={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
      gap="4"
      className="p-3"
    >
      <InfoCard
        title="Órdenes de compra emitidas"
        data={saleOrders.length}
        icon={<CiInboxOut />}
      />
      <InfoCard
        title="Órdenes de compra recibidas"
        data={saleOrdersReceived.length}
        icon={<CiInboxIn />}
      />
    </Grid>
  );
};

export default SaleOrdersOverview;

//component that is used for rendering the information
const InfoCard = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: number;
  icon: ReactNode;
}) => {
  return (
    <Flex justify="center">
      <Box className="w-1/4 shadow-lg rounded-l-full flex justify-center items-center bg-[var(--accent-9)] text-4xl text-white">
        {icon}
      </Box>
      <Flex
        className="bg-slate-100 rounded-r-lg p-3 shadow-lg"
        direction="column"
        justify="center"
        align="center"
      >
        <Box>
          <Text className="text-xl font-light">{title}</Text>
        </Box>
        <Box>
          <Text className="text-2xl">{data}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
