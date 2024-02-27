import DeleteDataDialog from '@/app/components/DeleteDataDialog';
import CloudImage from '@/app/components/cloud/CloudImage';
import useMonth from '@/app/hooks/useMonth';
import useWeekDay from '@/app/hooks/useWeekDay';
import { SaleOrder } from '@prisma/client';
import { Box, Button, Flex, Grid, Table, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import logo from '../../../../public/assets/images/byrs.png';
import qualitySeal from '../../../../public/assets/images/sellocalidad.jpg';
import PdfView from '../saleorderpdf/testpdf';
import { UpdateIcon } from '@radix-ui/react-icons';
import colors from '@/app/styles/colors';

interface Props {
  saleOrder: SaleOrder;
}

const SaleOrderDetails = ({ saleOrder }: Props) => {
  const year = new Date(saleOrder.date).getFullYear();
  const month = useMonth(saleOrder.date);
  const date = new Date(saleOrder.date).getDate();
  const day = useWeekDay(saleOrder.date);

  //repetitive styles
  const fieldNameStyle = 'font-bold text-black';

  const orderTotal = saleOrder.materials.reduce((accumulator, m) => {
    return m.quantity * m.unitPrice + accumulator;
  }, 0);

  return (
    <>
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
          gap="3"
        >
          <Box className="border border-slate-300 w-1/2 p-2 rounded-lg">
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
              <Text className=" bg-yellow-200 p-2 rounded-xl ml-2 font-semibold text-yellow-600">
                Pendiente
              </Text>
            )}
          </Box>
          <Flex
            className="p-2 border border-slate-300 w-1/2 rounded-lg"
            gap="3"
            direction="column"
          >
            <Box>
              <Text className="text-xl">Estado de orden de compra</Text>
            </Box>
            <Text
              className={classNames({
                'rounded-xl p-2 h-fit w-fit font-semibold': true,
                'bg-yellow-200 text-yellow-600 ':
                  saleOrder.status === 'PENDING',
                'bg-indigo-300 text-blue-700 ':
                  saleOrder.status === 'IN_PROCESS',
                'bg-red-300 text-red-700': saleOrder.status === 'NOT_MATCHING',
                'bg-green-300 text-green-700 ': saleOrder.status === 'ARRIVED',
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
              <Button style={{ backgroundColor: colors.buttonColors.green }}>
                <UpdateIcon />
                <Link href={`/oc/edit/${saleOrder.id}`}>
                  Actualizar orden de compra
                </Link>
              </Button>
              <DeleteDataDialog
                name="orden de compra"
                id={saleOrder.id}
                route="/api/saleorders"
                pushRoute="/oc"
              />
              <PdfView saleOrder={saleOrder} />
            </Flex>
          </Flex>
        </Flex>
        <Box className="border-black border-2 p-5">
          {/* Cabecera de documento */}
          <div id="pdf">
            {/* </div> */}
            <Flex className="justify-around" gap="9" align="center">
              <Box>
                <Image src={logo} alt="logo" height={200} width={200} />
              </Box>
              <Flex direction="column" justify="center" align="center">
                <Box className="flex gap-4">
                  <Text className="text-2xl font-bold text-black">
                    Orden de Compra
                  </Text>
                  <Text className="text-2xl font-bold text-black">
                    Nr {saleOrder.number}
                  </Text>
                </Box>
                <Box>
                  <Text className="text-center text-black">{`${day} ${date} de ${month} ${year}`}</Text>
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
                    <Text className="capitalize text-black">
                      {saleOrder.providerName}
                    </Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex className="w-1/2">
                    <Text className={fieldNameStyle}>DIRECCIÓN</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="capitalize text-black">
                      {saleOrder.providerAddress}
                    </Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex className="w-1/2">
                    <Text className={fieldNameStyle}>GIRO</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="capitalize text-black">
                      {saleOrder.providerLine}
                    </Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex className=" w-1/2">
                    <Text className={fieldNameStyle}>EMAIL</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="capitalize text-black">
                      {saleOrder.providerEmail}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" grow="1">
                <Flex gap="4">
                  <Flex className="w-1/2">
                    <Text className={fieldNameStyle}>RUT</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="capitalize text-black">
                      {saleOrder.providerRut}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap="4">
                  <Flex className="w-1/2">
                    <Text className={fieldNameStyle}>CIUDAD</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="capitalize text-black">
                      {saleOrder.providerCity}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap="4">
                  <Flex className="w-1/2">
                    <Text className={fieldNameStyle}>FONO</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="capitalize text-black">
                      {saleOrder.providerPhone}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap="4">
                  <Flex className="w-1/2">
                    <Text className={fieldNameStyle}>CONTACTO</Text>
                  </Flex>
                  <Flex grow="1" justify="start">
                    <Text className="uppercase font-bold text-black">
                      {saleOrder.providerContact}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {/* Informacion del proveedor */}

            <Box className="p-3">
              <Text className="font-bold text-black">
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
                      <Table.Row key={m.id}>
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
                <Text className="font-bold underline text-black">
                  SOLICITADO POR EL Sr:
                </Text>
                <Text className="text-black">{saleOrder.requestedBy}</Text>
              </Flex>
              <Flex direction="column">
                <Flex gap="6" className="border border-black ">
                  <Flex grow="1">
                    <Text className="text-black">TOTAL</Text>
                  </Flex>
                  <Flex grow="1" justify="end">
                    <Text className="text-black">$ {orderTotal}</Text>
                  </Flex>
                </Flex>
                <Flex gap="6" className="border border-black">
                  <Flex grow="1">
                    <Text className="text-black">
                      DESCTO.{saleOrder.discount}%
                    </Text>
                  </Flex>
                  <Flex grow="1" justify="end">
                    <Text className="text-black">
                      {orderTotal * (saleOrder.discount / 100)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap="6" className="border border-black">
                  <Flex grow="1">
                    <Text className="text-black">TOTAL NETO</Text>
                  </Flex>
                  <Flex grow="1" justify="end">
                    <Text className="text-black">
                      $ {orderTotal - orderTotal * (saleOrder.discount / 100)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap="6" className="border border-black">
                  <Flex grow="1">
                    <Text className="text-black">IVA 19%</Text>
                  </Flex>
                  <Flex grow="1" justify="end">
                    <Text className="text-black">
                      $
                      {(orderTotal - orderTotal * (saleOrder.discount / 100)) *
                        0.19}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap="6" className="border border-black p-2">
                  <Flex grow="1">
                    <Text className="font-bold text-black">TOTAL</Text>
                  </Flex>
                  <Flex grow="1" justify="end">
                    <Text className="text-black">
                      $ ${' '}
                      {orderTotal -
                        orderTotal * (saleOrder.discount / 100) +
                        (orderTotal - orderTotal * (saleOrder.discount / 100)) *
                          0.19}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {/* PIE DE TABLA */}

            {/* Disclaimer  */}
            <Flex className="p-5">
              <Box>
                <Text className="font-bold text-black">
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
                  <Text className="font-bold underline text-black">
                    FACTURAR A :
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex className="w-1/3">
                  <Text className="font-bold text-black">RAZÓN SOCIAL</Text>
                </Flex>
                <Flex grow="1">
                  <Text className="text-black">
                    MAESTRANZA BACIAN Y ROCHA LTDA.
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex className="w-1/3">
                  <Text className="font-bold text-black">RUT</Text>
                </Flex>
                <Flex grow="1">
                  <Text className="text-black">79.863.750-9</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex className="w-1/3">
                  <Text className="font-bold text-black">DIRECCIÓN</Text>
                </Flex>
                <Flex grow="1">
                  <Text className="text-black">
                    AV. LAS PARCELAS MANZANA D SITIO 7 ALTO HOSPICIO
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex className="w-1/3">
                  <Text className="font-bold text-black">GIRO</Text>
                </Flex>
                <Flex grow="1">
                  <Text className="text-black">MAESTRANZA</Text>
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
                <Text className="font-bold text-center text-black">
                  SOLICITADO POR
                </Text>
                <Text className="capitalize text-center text-black">
                  {saleOrder.requestedBy}
                </Text>
              </Flex>
              <Flex
                className="border border-black"
                justify="center"
                direction="column"
              >
                <Text className="font-bold text-center text-black">
                  EMITIDO POR
                </Text>
                <Text className="capitalize text-center text-black">
                  {saleOrder.emittedBy}
                </Text>
              </Flex>
              <Flex
                className="border border-black"
                justify="center"
                direction="column"
              >
                <Text className="font-bold text-center text-black">
                  AUTORIZADO POR
                </Text>
                <Text className="capitalize text-center text-black">
                  {saleOrder.approvedBy}
                </Text>
              </Flex>
            </Grid>
            {/* Informacion sobre soliciud y aprobacion */}

            {/* Email de contactos */}
            <Flex className="justify-evenly mt-5" gap="9">
              <Flex direction="column" justify="center" align="center">
                <Text className="font-bold text-black">
                  Bacianproduccion@gmail.com
                </Text>
                <Text className="text-black">57/ 254 2883</Text>
              </Flex>
              <Flex direction="column" justify="center" align="center">
                <Text className="font-bold text-black">
                  mbacian@bacianyrocha.cl
                </Text>
                <Text className="text-black">57/ 542883</Text>
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
          </div>
        </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default SaleOrderDetails;
