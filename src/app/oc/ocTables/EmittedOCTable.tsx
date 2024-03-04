'use client';
import Pagination from '@/app/components/Pagination';
import colors from '@/app/styles/colors';
import { ReceivedSaleOrder, SaleOrder } from '@prisma/client';
import { Badge, Box, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  saleOrders: SaleOrder[];
}

const EmittedOCTable = ({ saleOrders }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);
  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">O.C Emitidas</Text>
      </Box>
      <Table.Root variant="surface" className="shadow-lg">
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-white">
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Proveedor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {saleOrders
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((order, index) => {
              return (
                <Table.Row
                  key={order.id}
                  className={
                    index % 2 === 0 ? colors.tableNthChild : 'bg-white'
                  }
                >
                  <Table.Cell className="font-bold">
                    <Link href={`/oc/${order.id}`}>#{order.number}</Link>
                  </Table.Cell>
                  <Table.Cell>{order.providerName}</Table.Cell>
                  <Table.Cell>
                    {new Date(order.date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={
                        order.status == 'ARRIVED'
                          ? 'green'
                          : order.status == 'IN_PROCESS'
                          ? 'yellow'
                          : order.status == 'NOT_MATCHING'
                          ? 'tomato'
                          : 'indigo'
                      }
                    >
                      {order.status == 'ARRIVED'
                        ? 'Entregada'
                        : order.status == 'IN_PROCESS'
                        ? 'En camino'
                        : order.status == 'NOT_MATCHING'
                        ? 'No concuerda'
                        : 'Pendiente'}
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
        itemCount={saleOrders.length}
        setPage={setPage}
      />
    </>
  );
};

export default EmittedOCTable;
