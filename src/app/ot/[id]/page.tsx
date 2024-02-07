import React from 'react';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import logo from '../../../../public/assets/images/byrs.png';

interface Params {
  params: { id: string };
}

const WorkOrderDetails = async ({ params }: Params) => {
  const workOrder = await prisma?.workOrder.findUnique({
    where: { id: params.id },
  });

  if (!workOrder) return notFound();

  return (
    <>
      <Box className="bg-white rounded-md p-5">
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
            align="center"
            className="bg-[#013564] p-3"
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
      </Box>
    </>
  );
};

export default WorkOrderDetails;
