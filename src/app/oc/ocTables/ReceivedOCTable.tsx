'use client';
import Pagination from '@/app/components/Pagination';
import GalleryModal from '@/app/ot/_components/GalleryModal';
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
      <Table.Root variant="surface" className="shadow-lg">
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-white">
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Archivos</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {receivedSaleOrders
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((order, index) => {
              console.log(order.files);
              return (
                <Table.Row
                  key={order.id}
                  className={
                    index % 2 === 0 ? colors.tableNthChild : 'bg-white'
                  }
                >
                  <Table.Cell className="font-bold">
                    <Link href={`/oc/receivedoc/${order.id}`}>
                      #{order.number}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="w-1/3">
                    {order.files.length === 0
                      ? 'No hay archivos adjuntos'
                      : `${order.files.length} archivos adjuntos`}
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
