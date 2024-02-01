'use client';
import Pagination from '@/app/components/Pagination';
import { SaleOrder } from '@prisma/client';
import { Badge, Box, Table, Text } from '@radix-ui/themes';
import React, { useState } from 'react';

interface Props {
  saleOrders: SaleOrder[];
}

const DeliveredOcTable = ({ saleOrders }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);
  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">O.C Recepcionadas</Text>
      </Box>
      <Table.Root variant="surface">
        <Table.Header className="bg-blue-300">
          <Table.Row>
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Proveedor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Guía de recepción</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {saleOrders
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((order) => {
              return (
                <Table.Row key={order.id}>
                  <Table.Cell>{order.number}</Table.Cell>
                  <Table.Cell>{order.providerName}</Table.Cell>
                  <Table.Cell>{order.receptionGuide}</Table.Cell>
                  <Table.Cell>
                    <Badge color="green">
                      {order.status === 'ARRIVED' && 'Entregada'}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        setPage={setPage}
        itemCount={saleOrders.length}
      />
    </>
  );
};

export default DeliveredOcTable;
