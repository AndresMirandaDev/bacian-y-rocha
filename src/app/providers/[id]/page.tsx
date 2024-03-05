import React from 'react';
import prisma from '../../../../prisma/client';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Text,
} from '@radix-ui/themes';
import DeleteDataDialog from '@/app/components/DeleteDataDialog';
import { UpdateIcon } from '@radix-ui/react-icons';
import { FaUserCircle } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaTruckFast, FaTruckFront } from 'react-icons/fa6';

interface Params {
  params: { id: string };
}

const ProviderDetails = async ({ params }: Params) => {
  const provider = await prisma.stakeholders.findUnique({
    where: { id: params.id },
  });

  if (!provider) return notFound();
  return (
    <Box className="p-3">
      <Card>
        <Grid
          columns={{
            initial: '1',
            xs: '1',
            sm: '1',
            md: '1',
            lg: '1',
            xl: '1',
          }}
          align="center"
          gap="4"
        >
          <Flex
            className="row-span-3"
            justify="center"
            direction="column"
            align={'center'}
          >
            <Box className="text-9xl text-slate-400">
              <FaTruckFast />
            </Box>
            <Text className="text-slate-400 text-xl">Proveedor</Text>
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">
                Nombre
              </Text>
            </Box>
            <Box>
              <Text className="text-2xl capitalize">{provider.name}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">
                Dirección
              </Text>
            </Box>
            <Box>
              <Text className="capitalize">{provider.address}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">Email</Text>
            </Box>
            <Box>
              <Text>{provider.email}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">RUT</Text>
            </Box>
            <Box>
              <Text>{provider.rut}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">
                Número telefónico
              </Text>
            </Box>
            <Box>
              <Text>{provider.phone}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">
                Cuidad
              </Text>
            </Box>
            <Box>
              <Text className="capitalize">{provider.city}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">Giro</Text>
            </Box>
            <Box>
              <Text className="capitalize">{provider.sector}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column" gap="3">
            <Box>
              <Button className="w-full" style={{ backgroundColor: '#2ebb45' }}>
                <UpdateIcon />
                <Link href={`/providers/edit/${provider.id}`}>
                  Actualizar información
                </Link>
              </Button>
            </Box>
            <DeleteDataDialog
              id={provider.id}
              route="/api/providers"
              pushRoute="/providers"
              name="proveedor"
            />
            <Box></Box>
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
};
export default ProviderDetails;
