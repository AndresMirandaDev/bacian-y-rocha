import {
  Box,
  Flex,
  Grid,
  ScrollArea,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '../../../../prisma/client';
import logo from '../../../../public/assets/images/byrs.png';
import WorkOrderActions from './WorkOrderActions';
import TaskAccordion from './TaskAccordion';
import DetailsHeader from './_components/DetailsHeader';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import colors from '@/app/styles/colors';

interface Params {
  params: { id: string };
}

const WorkOrderDetails = async ({ params }: Params) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: { id: params.id },
  });

  if (!workOrder) return notFound();

  const totalBalance =
    workOrder.workPrice -
    (workOrder.activities.reduce((accumulator, activity) => {
      return (
        accumulator +
        activity.subTasks.reduce((acc, st) => {
          return acc + st.hours * st.hourPrice;
        }, 0)
      );
    }, 0) +
      workOrder.materials.reduce((accumulator, m) => {
        return (
          m.quantity * m.unitPrice -
          m.quantity * m.unitPrice * (m.discount / 100) +
          accumulator
        );
      }, 0));

  const totalExpenses =
    workOrder.activities.reduce((accumulator, activity) => {
      return (
        accumulator +
        activity.subTasks.reduce((acc, st) => {
          return acc + st.hours * st.hourPrice;
        }, 0)
      );
    }, 0) +
    workOrder.materials.reduce((accumulator, m) => {
      return (
        m.quantity * m.unitPrice -
        m.quantity * m.unitPrice * (m.discount / 100) +
        accumulator
      );
    }, 0);

  const totalHours = workOrder.activities.reduce((accumulator, activity) => {
    return (
      accumulator +
      activity.subTasks.reduce((acc, st) => {
        return acc + st.hours * st.hourPrice;
      }, 0)
    );
  }, 0);

  const materialExpenses = workOrder.materials.reduce((accumulator, m) => {
    return (
      m.quantity * m.unitPrice -
      m.quantity * m.unitPrice * (m.discount / 100) +
      accumulator
    );
  }, 0);

  return (
    <>
      <Box className="bg-white rounded-md p-5">
        {/* cabecera  */}
        <WorkOrderActions id={workOrder.id} />
        <Flex
          className="border border-slate-300 rounded-md"
          gap="4"
          direction={{
            initial: 'column',
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          }}
        >
          <Box>
            <Image src={logo} width={200} height={200} alt="logo" />
          </Box>
          <Flex
            direction="column"
            justify="center"
            className="bg-[#013564] p-3"
            align={{
              initial: 'start',
              xs: 'start',
              sm: 'start',
              md: 'start',
              lg: 'center',
              xl: 'center',
            }}
          >
            <Box>
              <Text className="text-slate-100 font-bold">INFORME TÉCNICO</Text>
            </Box>
            <Box>
              <Text className="text-slate-100 font-bold">
                REPARACIONES ESTRUCTURALES DE COMPONENTES
              </Text>
            </Box>
            <Box>
              <Text className="text-slate-100 font-bold">
                INDUSTRIALES Y MINEROS
              </Text>
            </Box>
          </Flex>
          <Grid columns="2" className="flex-grow">
            <Box className="border border-slate-300 flex justify-center items-center font-bold">
              <Text>Revisión</Text>
            </Box>
            <Box className="border border-slate-300 flex justify-center items-center">
              <Text>{workOrder.revision}</Text>
            </Box>
            <Box className="border border-slate-300 flex justify-center items-center font-bold">
              <Text>Código</Text>
            </Box>
            <Box className="border border-slate-300 flex justify-center items-center">
              <Text>{workOrder.code}</Text>
            </Box>
          </Grid>
        </Flex>
        {/* cabecera  */}

        {/* datos de orden de trabajo */}
        <Flex
          className="border border-slate-500 mt-10 p-3"
          direction="column"
          gap="3"
        >
          <Flex className="flex-grow" direction="column">
            <Box>
              <Text className="font-bold">Orden de trabajo N°</Text>
            </Box>
            <Box>
              <Text>{workOrder.number}</Text>
            </Box>
          </Flex>
          <Flex direction="column" className="flex-grow">
            <Box>
              <Text className="font-bold">Asunto:</Text>
            </Box>
            <Box>
              <Text>{workOrder.description}</Text>
            </Box>
          </Flex>
          <Flex direction="column" className="flex-grow">
            <Box>
              <Text className="font-bold">Precio Cobrado:</Text>
            </Box>
            <Box>
              <Text>$ {workOrder.workPrice}</Text>
            </Box>
          </Flex>
        </Flex>
        {/* datos de orden de trabajo */}

        {/* Datos generales */}

        <Flex direction="column">
          <DetailsHeader title="1.datos generales" />
          <Grid
            columns={{
              initial: '1',
              xs: '1',
              sm: '1',
              md: '1',
              lg: '2',
              xl: '2',
            }}
            className="p-1"
            gap={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '0', xl: '0' }}
          >
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Cliente</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.client}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Fecha inicio</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.startDate.toLocaleDateString()}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">N° cotización</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.quoteNumber}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Fecha Entrega</Text>
              </Box>
              <Box className="w-1/2">
                <Text>
                  {workOrder.endDate
                    ? workOrder.endDate.toLocaleDateString()
                    : 'Pendiente'}
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Requiere placa</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.requiresPlaque}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Fecha estimada de entrega </Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.estimatedDate.toLocaleDateString()}</Text>
              </Box>
            </Flex>
          </Grid>
        </Flex>

        {/* Datos generales */}

        {/* Datos de componente */}
        <Flex direction="column">
          <DetailsHeader title="2.datos de componente" />
          <Grid
            columns={{
              initial: '1',
              xs: '1',
              sm: '1',
              md: '1',
              lg: '2',
              xl: '2',
            }}
            className="p-1"
            gap={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '0', xl: '0' }}
          >
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Componente</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.componentName}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Modelo</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.model}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">Equipo</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.componentDevice}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box className="w-1/2">
                <Text className="font-bold">N° de parte</Text>
              </Box>
              <Box className="w-1/2">
                <Text>{workOrder.deviceNumber}</Text>
              </Box>
            </Flex>
          </Grid>
        </Flex>
        {/* Datos de componente */}
        {/* Materiales      */}
        <Flex direction="column">
          <DetailsHeader title="3.materiales a utilizar o comprar/repuestos" />
          <Box>
            <Table.Root variant="ghost" className="border border-black">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className="hidden md:table-cell">
                    CANTIDAD
                  </Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell>CÓDIGO</Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell>ARTÍCULO</Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell className="hidden md:table-cell">
                    VALOR UNIT.
                  </Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell>TOTAL</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {workOrder.materials.map((m) => {
                  return (
                    <Table.Row key={m.id}>
                      <Table.Cell className="hidden md:table-cell">
                        {m.quantity}
                      </Table.Cell>
                      <Table.Cell>{m.code}</Table.Cell>
                      <Table.Cell>{m.name}</Table.Cell>
                      <Table.Cell className="hidden md:table-cell">
                        $ {m.unitPrice}
                      </Table.Cell>
                      <Table.Cell>
                        $
                        {m.quantity * m.unitPrice -
                          m.quantity * m.unitPrice * (m.discount / 100)}
                        (dcto. {m.discount}%)
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        </Flex>
        <Flex justify="end" className="border border-slate-500 p-3">
          <Flex gap="4">
            <Box>
              <Text className="text-xl font-bold">TOTAL</Text>
            </Box>
            <Box>
              <Text className="text-xl">
                $
                {workOrder.materials.reduce((accumulator, m) => {
                  return (
                    m.quantity * m.unitPrice -
                    m.quantity * m.unitPrice * (m.discount / 100) +
                    accumulator
                  );
                }, 0)}
              </Text>
            </Box>
          </Flex>
        </Flex>
        {/* Materiales      */}

        {/* actividades */}
        <DetailsHeader title="4.actividades" />
        {workOrder.activities.map((a) => {
          return <TaskAccordion key={a.id} activity={a} />;
        })}
        {/* actividades */}

        {/* gastos */}
        <DetailsHeader title="5.gastos" />
        <Grid
          columns={{
            initial: '1',
            xs: '1',
            sm: '1',
            md: '1',
            lg: '1',
            xl: '1',
          }}
          gap="4"
          className="p-1"
        >
          <Flex justify="between">
            <Box>
              <Text className="font-bold ">Gastos en materiales</Text>
            </Box>
            <Box>
              <Text className="text-xl">${totalExpenses}</Text>
            </Box>
          </Flex>
          <Separator size="4" />
          <Flex justify="between">
            <Box>
              <Text className="font-bold ">Gastos H.H</Text>
            </Box>
            <Box>
              <Text className="text-xl">${totalHours}</Text>
            </Box>
          </Flex>
          <Separator size="4" />
          <Flex justify="between">
            <Box>
              <Text className="font-bold text-xl">Gastos Totales</Text>
            </Box>
            <Box>
              <Text className="text-xl font-bold">${totalExpenses}</Text>
            </Box>
          </Flex>
          <Separator size="4" />
          <Flex justify="between">
            <Box>
              <Text className="font-bold text-xl">Precio cobrado</Text>
            </Box>
            <Box>
              <Text className="text-xl font-bold">${workOrder.workPrice}</Text>
            </Box>
          </Flex>
          <Separator size={'4'} />
          <Flex justify="between">
            <Box className="flex items-center gap-3">
              <Text className="font-bold text-2xl">Balance</Text>
              {totalBalance > 0 && (
                <Box className="mr-5 text-green-500 text-2xl">
                  <FaArrowTrendUp />
                </Box>
              )}
              {totalBalance < 0 && (
                <Box className="mr-5 text-red-500 text-2xl">
                  <FaArrowTrendDown />
                </Box>
              )}
            </Box>
            <Box>
              <Text
                className="text-2xl font-bold"
                style={{
                  color:
                    totalBalance > 0
                      ? colors.buttonColors.green
                      : colors.buttonColors.danger,
                }}
              >
                ${totalBalance}
              </Text>
            </Box>
          </Flex>
        </Grid>
        {/* gastos */}
      </Box>
    </>
  );
};

export default WorkOrderDetails;
