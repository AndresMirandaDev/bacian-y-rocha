import DeleteDataDialog from '@/app/components/DeleteDataDialog';
import colors from '@/app/styles/colors';
import { Position } from '@prisma/client';
import { Box, Flex, Separator, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  position: Position;
}

const PositionListItem = ({ position }: Props) => {
  return (
    <>
      <Link href={`/positions/edit/${position.id}`}>
        <Flex
          justify="between"
          className="text-slate-100 bg-slate-600 hover:bg-slate-300 hover:scale-105 transition-all duration-500 p-3 cursor-pointer hover:text-slate-700"
          align="center"
        >
          <Flex direction="column">
            <Box>
              <Text>Nombre</Text>
            </Box>
            <Box>
              <Text className="font-semibold text-xl">{position.name}</Text>
            </Box>
          </Flex>
          <Flex direction="column">
            <Box>
              <Text>Valor(hora)</Text>
            </Box>
            <Box>
              <Text className="font-semibold text-xl">$ {position.value}</Text>
            </Box>
          </Flex>
        </Flex>
        <Separator size="4" />
      </Link>
    </>
  );
};

export default PositionListItem;
