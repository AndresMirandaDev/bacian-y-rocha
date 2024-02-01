'use client';
import Pagination from '@/app/components/Pagination';
import { ReceivedSaleOrder, SaleOrder } from '@prisma/client';
import { Box, Table, Text } from '@radix-ui/themes';
import React, { useState } from 'react';

interface Props {
  receivedSaleOrders: ReceivedSaleOrder[];
}

const ReceivedOCTable = ({ receivedSaleOrders }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);
  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">O.C Recibidas</Text>
      </Box>
      <Table.Root variant="surface">
        <Table.Header className="bg-blue-300">
          <Table.Row>
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Archivo</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {receivedSaleOrders
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((order) => {
              return (
                <Table.Row key={order.id}>
                  <Table.Cell className="font-bold">#{order.number}</Table.Cell>
                  <Table.Cell>{order.file}</Table.Cell>
                  <Table.Cell>
                    {new Date(order.receivedDate).toLocaleDateString()}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={receivedSaleOrders.length}
        setPage={setPage}
      />
    </>
  );
};

export default ReceivedOCTable;
