import { SaleOrder } from '@prisma/client';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import logo from '../../../../public/assets/images/byrs.png';
import qualitySeal from '../../../../public/assets/images/sellocalidad.jpg';
import Image from 'next/image';
import useMonth from '@/app/hooks/useMonth';
import useWeekDay from '@/app/hooks/useWeekDay';
import CloudImage from '@/app/components/cloud/CloudImage';
import classNames from 'classnames';

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
      <Flex
        className="mb-5"
        direction={{
          initial: 'column',
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'row',
          xl: 'row',
        }}
      >
        <Box className="border border-black w-1/2 p-2">
          <Text className="text-xl">Guía de recepción</Text>
          {saleOrder.receptionGuide !== 'pending' && (
            <CloudImage
              alt="receptionguide"
              src={saleOrder.receptionGuide}
              width={200}
              height={200}
            />
          )}
          {saleOrder.receptionGuide === 'pending' && (
            <Text className="font-bold bg-yellow-400 p-2 rounded-3xl ml-2">
              Pendiente
            </Text>
          )}
        </Box>
        <Flex
          className="p-2 border border-black w-1/2"
          gap="3"
          direction="column"
        >
          <Box>
            <Text className="text-xl">Estado de orden de compra</Text>
          </Box>
          <Text
            className={classNames({
              'font-bold rounded-3xl p-2 h-fit w-fit': true,
              'bg-yellow-400': saleOrder.status === 'PENDING',
              'bg-indigo-500': saleOrder.status === 'IN_PROCESS',
              'bg-red-500': saleOrder.status === 'NOT_MATCHING',
              'bg-green-500': saleOrder.status === 'ARRIVED',
            })}
          >
            {saleOrder.status === 'ARRIVED'
              ? 'Entregada'
              : saleOrder.status === 'IN_PROCESS'
              ? 'En camino'
              : saleOrder.status === 'NOT_MATCHING'
              ? 'No concuerda'
              : 'Pendiente'}
          </Text>
          <Flex direction="column" gap="4">
            <Button>Actualizar orden de compra</Button>
            <Button color="red">Eliminar orden de compra</Button>
          </Flex>
        </Flex>
      </Flex>
      <Box className="border-black border-2 p-5">
        {/* Cabecera de documento */}
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
        {/* Cabecera de documento */}

        {/* Informacion del proveedor */}
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
        {/* Informacion del proveedor */}

        <Box className="p-3">
          <Text className="font-bold">
            * Según Cotización Nr {saleOrder.accordingToQuote}
          </Text>
        </Box>

        {/* Tabla de materiales */}
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
        {/* Tabla de materiales */}

        {/* PIE DE TABLA */}
        <Flex className="p-2 " justify="between">
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
        {/* PIE DE TABLA */}

        {/* Disclaimer  */}
        <Flex className="p-5">
          <Box>
            <Text className="font-bold">
              AL FACTURAR NO OLVIDE HACER REFERENCIA AL NÚMERO DE ORDEN DE
              COMPRA, PARA UNA CANCELACIÓN MAS EXPEDITA.
            </Text>
          </Box>
        </Flex>
        {/* Disclaimer  */}

        {/* Informacion sobre donde facturar    */}
        <Flex direction="column">
          <Flex>
            <Flex className="w-1/3 mb-3">
              <Text className="font-bold underline">FACTURAR A :</Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex className="w-1/3">
              <Text className="font-bold">RAZÓN SOCIAL</Text>
            </Flex>
            <Flex grow="1">
              <Text>MAESTRANZA BACIAN Y ROCHA LTDA.</Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex className="w-1/3">
              <Text className="font-bold">RUT</Text>
            </Flex>
            <Flex grow="1">
              <Text>79.863.750-9</Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex className="w-1/3">
              <Text className="font-bold">DIRECCIÓN</Text>
            </Flex>
            <Flex grow="1">
              <Text>AV. LAS PARCELAS MANZANA "D" SITIO 7 ALTO HOSPICIO</Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex className="w-1/3">
              <Text className="font-bold">GIRO</Text>
            </Flex>
            <Flex grow="1">
              <Text>MAESTRANZA</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Informacion sobre donde facturar    */}

        {/* Informacion sobre soliciud y aprobacion */}
        <Grid columns="3" className="mt-5" justify="center">
          <Flex
            className="border border-black"
            justify="center"
            direction="column"
          >
            <Text className="font-bold text-center">SOLICITADO POR</Text>
            <Text className="capitalize text-center">
              {saleOrder.requestedBy}
            </Text>
          </Flex>
          <Flex
            className="border border-black"
            justify="center"
            direction="column"
          >
            <Text className="font-bold text-center">EMITIDO POR</Text>
            <Text className="capitalize text-center">
              {saleOrder.emittedBy}
            </Text>
          </Flex>
          <Flex
            className="border border-black"
            justify="center"
            direction="column"
          >
            <Text className="font-bold text-center">AUTORIZADO POR</Text>
            <Text className="capitalize text-center">
              {saleOrder.approvedBy}
            </Text>
          </Flex>
        </Grid>
        {/* Informacion sobre soliciud y aprobacion */}

        {/* Email de contactos */}
        <Flex className="justify-evenly mt-5" gap="9">
          <Flex direction="column" justify="center" align="center">
            <Text className="font-bold">Bacianproduccion@gmail.com</Text>
            <Text>57/ 254 2883</Text>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text className="font-bold">mbacian@bacianyrocha.cl</Text>
            <Text>57/ 542883</Text>
          </Flex>
        </Flex>

        {/* Pie de documento con sello */}
        <Flex className="mt-40 relative" direction="column">
          <Box height="4" width={'100%'} className="bg-yellow-300"></Box>
          <Box
            height="6"
            width={'100%'}
            className="bg-gradient-to-b from-blue-500"
          ></Box>
          <Image
            src={qualitySeal}
            alt="quality"
            className="self-end absolute bottom-1"
            height={100}
            width={100}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default SaleOrderDetails;
