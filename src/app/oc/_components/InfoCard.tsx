import { Flex, Box, Text } from '@radix-ui/themes';
import { ReactNode } from 'react';

export const InfoCard = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: number;
  icon: ReactNode;
}) => {
  return (
    <Flex justify="center">
      <Box className="w-1/4 shadow-lg rounded-l-full flex justify-center items-center bg-[var(--accent-9)] text-4xl text-white">
        {icon}
      </Box>
      <Flex
        className="bg-slate-100 rounded-r-lg p-3 shadow-lg"
        direction="column"
        justify="center"
        align="center"
      >
        <Box>
          <Text className="text-xl font-light">{title}</Text>
        </Box>
        <Box>
          <Text className="text-2xl">{data}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
