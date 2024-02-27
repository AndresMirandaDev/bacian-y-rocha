'use client';
import Pagination from '@/app/components/Pagination';
import colors from '@/app/styles/colors';
import { cloudinaryBaseUrl } from '@/cloud/config';
import { ReceivedSaleOrder, SaleOrder } from '@prisma/client';
import { Box, IconButton, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';

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
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-white">
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
                  <Table.Cell className="font-bold">
                    <Link href={`/oc/receivedoc/${order.id}`}>
                      #{order.number}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {order.file !== 'pending' && (
                      <IconButton
                        size="1"
                        color="gray"
                        onClick={() => {
                          window.open(
                            `${cloudinaryBaseUrl}/image/upload/${order.file}`,
                            '_blank'
                          );
                        }}
                      >
                        <FaFilePdf />
                      </IconButton>
                    )}
                    {order.file === 'pending' && 'No hay archivo'}
                  </Table.Cell>
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
