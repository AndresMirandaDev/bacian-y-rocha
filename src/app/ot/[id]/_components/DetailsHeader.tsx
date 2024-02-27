import { Flex, Box, Text } from '@radix-ui/themes';
import React from 'react';

interface Props {
  title: string;
}

const DetailsHeader = ({ title }: Props) => {
  return (
    <Flex direction="column">
      <Box className="bg-[#013564] w-full p-1 mt-10">
        <Text className="text-slate-100 font-bold">{title.toUpperCase()}</Text>
      </Box>
    </Flex>
  );
};

export default DetailsHeader;
