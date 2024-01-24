'use client';
import { cloudinaryBaseUrl } from '@/cloud/config';
import { Quote } from '@prisma/client';
import { Box, Flex, IconButton, Table, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { FaFilePdf, FaTrash } from 'react-icons/fa6';
import Pagination from '../components/Pagination';
import { FaEdit } from 'react-icons/fa';
import DeleteDataDialog from '../components/DeleteDataDialog';

interface Props {
  quotes: Quote[];
}

const QuotesTable = ({ quotes }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);

  return (
    <>
      <Text className="text-xl">Cotizaciones</Text>
      <Table.Root variant="surface">
        <Table.Header className="bg-blue-300">
          <Table.Row>
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Archivo PDF</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {quotes
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((quote) => {
              return (
                <Table.Row key={quote.id}>
                  <Table.Cell className="font-bold">#{quote.number}</Table.Cell>
                  <Table.Cell>
                    <IconButton
                      size="1"
                      color="gray"
                      onClick={() => {
                        window.open(
                          `${cloudinaryBaseUrl}/image/upload/${quote.file}`,
                          '_blank'
                        );
                      }}
                    >
                      <FaFilePdf />
                    </IconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="3">
                      <Box className="text-cyan-600 cursor-pointer">
                        <FaEdit size={15} />
                      </Box>
                      <DeleteDataDialog
                        name={`cotización nr ${quote.number}`}
                        id={quote.id}
                      />
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={quotes.length}
        currentPage={currentPage}
        pageSize={pageSize}
        setPage={setPage}
      />
    </>
  );
};

export default QuotesTable;
