'use client';
import Pagination from '@/app/components/Pagination';
import colors from '@/app/styles/colors';
import { cloudinaryBaseUrl } from '@/cloud/config';
import { SaleOrder } from '@prisma/client';
import { Badge, Box, IconButton, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';

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
      <Table.Root variant="surface" className="shadow-lg">
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-white">
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
                  <Table.Cell className="font-bold">
                    <Link href={`/oc/${order.id}`}>#{order.number}</Link>
                  </Table.Cell>
                  <Table.Cell>{order.providerName}</Table.Cell>
                  <Table.Cell>
                    {order.receptionGuide !== 'pending' && (
                      <IconButton
                        size="1"
                        color="gray"
                        onClick={() => {
                          window.open(
                            `${cloudinaryBaseUrl}/image/upload/${order.receptionGuide}`,
                            '_blank'
                          );
                        }}
                      >
                        <FaFilePdf />
                      </IconButton>
                    )}
                    {order.receptionGuide === 'pending' && 'No hay archivo'}
                  </Table.Cell>
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
