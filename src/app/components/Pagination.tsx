import {
  DoubleArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Flex, Button, Text } from '@radix-ui/themes';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ itemCount, pageSize, currentPage, setPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <Flex align="center" justify="end" className="mt-3" gap="2">
      <Text size="2" className="text-zinc-500 font-semibold">
        Pág {currentPage + 1} de {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 0}
        onClick={() => setPage(0)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 0}
        onClick={() => setPage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage + 1 === pageCount}
        onClick={() => setPage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage + 1 === pageCount}
        onClick={() => setPage(pageCount - 1)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
