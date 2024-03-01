'use client';
import React, { useState } from 'react';
import { Badge, Box, Table, Text } from '@radix-ui/themes';

import colors from '@/app/styles/colors';
import Pagination from '@/app/components/Pagination';
import { WorkOrder } from '@prisma/client';
import Link from 'next/link';

interface Props {
  workOrders: WorkOrder[];
}

const PendingWorkOrdersTable = ({ workOrders }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">Ordenes de trabajo en proceso</Text>
      </Box>
      <Table.Root variant="surface">
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-slate-100">
            <Table.ColumnHeaderCell>N° O.T</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Cliente
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Text className="hidden md:block">Componente</Text>
              <Text className="block md:hidden">Descripción</Text>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {workOrders.map((wo) => {
            return (
              <Table.Row key={wo.id}>
                <Table.Cell className="font-bold">
                  <Link href={`/ot/${wo.id}`}> #{wo.number}</Link>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {wo.client}
                </Table.Cell>
                <Table.Cell>
                  <div className="block md:hidden text-slate-500 italic ">
                    Componente
                  </div>
                  <div>{wo.componentName}</div>
                  <div className="block md:hidden text-slate-500 italic ">
                    Cliente
                  </div>
                  <div className="block md:hidden">{wo.client}</div>
                </Table.Cell>
                <Table.Cell>
                  <Badge color="yellow">En proceso</Badge>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={currentPage}
        setPage={setCurrentPage}
        itemCount={workOrders.length}
        pageSize={pageSize}
      />
    </>
  );
};

export default PendingWorkOrdersTable;
