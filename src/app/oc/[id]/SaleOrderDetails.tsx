import { SaleOrder } from '@prisma/client';
import { Box, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import logo from '../../../../public/assets/images/byrs.png';
import Image from 'next/image';

interface Props {
  saleOrder: SaleOrder;
}

const SaleOrderDetails = ({ saleOrder }: Props) => {
  return (
    <Box>
      <Flex justify="center" gap="9">
        <Box>
          <Image src={logo} alt="logo" height={200} width={200} />
        </Box>
        <Flex direction="column">
          <Text>Orden de Compra Nr {saleOrder.number}</Text>
          <Text>{new Date(saleOrder.date).toLocaleDateString()}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SaleOrderDetails;
