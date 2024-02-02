import { SaleOrder } from '@prisma/client';
import { Box, Flex, Separator, Table, Text } from '@radix-ui/themes';
import React from 'react';
import logo from '../../../../public/assets/images/byrs.png';
import Image from 'next/image';
import useMonth from '@/app/hooks/useMonth';
import useWeekDay from '@/app/hooks/useWeekDay';

interface Props {
  saleOrder: SaleOrder;
}

const SaleOrderDetails = ({ saleOrder }: Props) => {
  const year = new Date(saleOrder.date).getFullYear();
  const month = useMonth(saleOrder.date);
  const date = new Date(saleOrder.date).getDate();
  const day = useWeekDay(saleOrder.date);

  //repetitive styles
  const fieldNameStyle = 'font-bold';

  const orderTotal = saleOrder.materials.reduce((accumulator, m) => {
    return m.quantity * m.unitPrice + accumulator;
  }, 0);
  return (
    <Box className="bg-white rounded-md p-5">
      <Box className="border-black border-2 p-5">
        <Flex className="justify-around" gap="9" align="center">
          <Box>
            <Image src={logo} alt="logo" height={200} width={200} />
          </Box>
          <Flex direction="column" justify="center" align="center">
            <Box className="flex gap-4">
              <Text className="text-2xl font-bold">Orden de Compra</Text>
              <Text className="text-2xl font-bold">Nr {saleOrder.number}</Text>
            </Box>
            <Box>
              <Text className="text-center">{`${day} ${date} de ${month} ${year}`}</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          className="border border-black p-2"
          direction={{
            initial: 'column',
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
        >
          <Flex direction="column" grow="1">
            <Flex>
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>SEÑOR</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerName}</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>DIRECCIÓN</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerAddress}</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>GIRO</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerLine}</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className=" w-1/2">
                <Text className={fieldNameStyle}>EMAIL</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerEmail}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" grow="1">
            <Flex gap="4">
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>RUT</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerRut}</Text>
              </Flex>
            </Flex>
            <Flex gap="4">
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>CIUDAD</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerCity}</Text>
              </Flex>
            </Flex>
            <Flex gap="4">
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>FONO</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="capitalize">{saleOrder.providerPhone}</Text>
              </Flex>
            </Flex>
            <Flex gap="4">
              <Flex className="w-1/2">
                <Text className={fieldNameStyle}>CONTACTO</Text>
              </Flex>
              <Flex grow="1" justify="start">
                <Text className="uppercase font-bold">
                  {saleOrder.providerContact}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Box className="p-3">
          <Text className="font-bold">
            * Según Cotización Nr {saleOrder.accordingToQuote}
          </Text>
        </Box>
        <Box>
          <Table.Root variant="ghost" className="border border-black">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>CANTIDAD</Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>CÓDIGO</Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>ARTÍCULO</Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>VALOR UNIT.</Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>TOTAL</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {saleOrder.materials.map((m) => {
                return (
                  <Table.Row key={m.code}>
                    <Table.Cell>{m.quantity}</Table.Cell>
                    <Table.Cell>{m.code}</Table.Cell>
                    <Table.Cell>{m.name}</Table.Cell>
                    <Table.Cell>$ {m.unitPrice}</Table.Cell>
                    <Table.Cell>$ {m.quantity * m.unitPrice}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
        <Flex className="p-2" justify="between">
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
            <Text className="font-bold underline">SOLICITADO POR EL Sr:</Text>
            <Text>{saleOrder.requestedBy}</Text>
          </Flex>
          <Flex direction="column">
            <Flex gap="6" className="border border-black">
              <Flex grow="1">
                <Text>TOTAL</Text>
              </Flex>
              <Flex grow="1" justify="end">
                <Text>$ {orderTotal}</Text>
              </Flex>
            </Flex>
            <Flex gap="6" className="border border-black">
              <Flex grow="1">
                <Text>DESCTO.</Text>
              </Flex>
              <Flex grow="1" justify="end">
                <Text>$ 123123</Text>
              </Flex>
            </Flex>
            <Flex gap="6" className="border border-black">
              <Flex grow="1">
                <Text>TOTAL NETO</Text>
              </Flex>
              <Flex grow="1" justify="end">
                <Text>$ 123123</Text>
              </Flex>
            </Flex>
            <Flex gap="6" className="border border-black">
              <Flex grow="1">
                <Text>IVA 19%</Text>
              </Flex>
              <Flex grow="1" justify="end">
                <Text>$ {orderTotal * 0.19}</Text>
              </Flex>
            </Flex>
            <Flex gap="6" className="border border-black p-2">
              <Flex grow="1">
                <Text className="font-bold">TOTAL</Text>
              </Flex>
              <Flex grow="1" justify="end">
                <Text>$ {orderTotal + orderTotal * 0.19}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default SaleOrderDetails;
