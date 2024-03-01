import DeleteDataDialog from '@/app/components/DeleteDataDialog';
import { User } from '@prisma/client';
import { UpdateIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Text,
} from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  user: User;
}

const UserDetails = ({ user }: Props) => {
  const label = '';
  return (
    <Card>
      <Grid
        columns={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '1', xl: '1' }}
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
            <FaUserCircle />
          </Box>
        </Flex>
        <Flex direction="column">
          <Box>
            <Text className="text-xl font-lighter text-slate-500">Nombre</Text>
          </Box>
          <Box>
            <Text>{user.name}</Text>
          </Box>
          <Separator size="4" />
        </Flex>
        <Flex direction="column">
          <Box>
            <Text className="text-xl font-lighter text-slate-500">Email</Text>
          </Box>
          <Box>
            <Text>{user.email}</Text>
          </Box>
          <Separator size="4" />
        </Flex>
        {user.phone && (
          <Flex direction="column">
            <Box>
              <Text className="text-xl font-lighter text-slate-500">
                Número telefónico
              </Text>
            </Box>
            <Box>
              <Text>{user.phone}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
        )}
        <Flex direction="column" gap="3">
          <Box>
            <Button className="w-full" style={{ backgroundColor: '#2ebb45' }}>
              <UpdateIcon />
              <Link href={`/register/edit/${user.id}`}>
                Actualizar información
              </Link>
            </Button>
          </Box>
          <DeleteDataDialog
            id={user.id}
            route="/api/users"
            pushRoute="/register"
            name="usuario"
          />
          <Box></Box>
        </Flex>
      </Grid>
    </Card>
  );
};

export default UserDetails;
