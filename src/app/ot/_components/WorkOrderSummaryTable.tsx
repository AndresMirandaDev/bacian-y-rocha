'use client';
import Pagination from '@/app/components/Pagination';
import { WorkOrder } from '@prisma/client';
import { CheckIcon } from '@radix-ui/react-icons';
import { AlertDialogAction, Badge, Box, Table } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiAlertLine } from 'react-icons/ri';

interface Props {
  workOrders: WorkOrder[];
  state: 'delayed' | 'fullfilled';
}

const WorkOrderSummaryTable = ({ workOrders, state }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header
          style={{
            backgroundColor: state === 'fullfilled' ? '#C7F9CC' : '#E76F51',
          }}
        >
          <Table.Row>
            <Table.ColumnHeaderCell>N° O.T</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado de entrega</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {workOrders
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((wo) => {
              return (
                <Table.Row key={wo.id}>
                  <Table.Cell>
                    <Box
                      className={classNames({
                        'w-fit p-1 rounded-full flex justify-center ': true,
                        'bg-green-500': state === 'fullfilled',
                        'bg-yellow-400': state === 'delayed',
                      })}
                    >
                      {state === 'fullfilled' && <CheckIcon />}
                      {state === 'delayed' && <RiAlertLine />}
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/ot/${wo.id}`} className="font-bold">
                      #{wo.number}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={state === 'fullfilled' ? 'green' : 'red'}>
                      {state === 'fullfilled'
                        ? 'Entregada a tiempo'
                        : 'Retrasada'}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={workOrders.length}
        currentPage={currentPage}
        setPage={setCurrentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export default WorkOrderSummaryTable;
