import { WorkOrder } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  workOrders: WorkOrder[];
}

const WorkOrdersTable = ({ workOrders }: Props) => {
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header className="bg-blue-300">
          <Table.Row>
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Cliente</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Componente</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha inicio</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha estimada</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {workOrders.map((wo) => {
            return (
              <Table.Row key={wo.id}>
                <Table.Cell className="font-bold">
                  <Link href={`/ot/${wo.id}`}> #{wo.number}</Link>
                </Table.Cell>
                <Table.Cell>{wo.client}</Table.Cell>
                <Table.Cell>{wo.componentName}</Table.Cell>
                <Table.Cell>
                  {new Date(wo.startDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  {new Date(wo.estimatedDate).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default WorkOrdersTable;
