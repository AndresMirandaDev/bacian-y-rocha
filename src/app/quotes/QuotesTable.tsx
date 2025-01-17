'use client';
import { cloudinaryBaseUrl } from '@/cloud/config';
import { Quote } from '@prisma/client';
import { Badge, Box, Flex, IconButton, Table, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { FaFilePdf, FaTrash } from 'react-icons/fa6';
import Pagination from '../components/Pagination';
import { FaEdit } from 'react-icons/fa';
import DeleteDataDialog from '../components/DeleteDataDialog';
import Link from 'next/link';
import colors from '../styles/colors';

interface Props {
  quotes: Quote[];
}

const QuotesTable = ({ quotes }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);

  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">Cotizaciones</Text>
      </Box>
      <Table.Root variant="surface" className="shadow-md">
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-white">
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Archivo PDF</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha de solicitud</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {quotes
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((quote, index) => {
              return (
                <Table.Row
                  key={quote.id}
                  className={
                    index % 2 === 0 ? colors.tableNthChild : 'bg-white'
                  }
                >
                  <Table.Cell className="font-bold">
                    <Link href={`/quotes/${quote.id}`}>#{quote.number}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    {quote.file !== 'pending' && (
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
                    )}
                    {quote.file === 'pending' && 'No hay archivo'}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(quote.requestedDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={quote.status === 'PENDING' ? 'yellow' : 'grass'}
                    >
                      {quote.status === 'PENDING' ? 'Pendiente' : 'Enviada'}
                    </Badge>
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
