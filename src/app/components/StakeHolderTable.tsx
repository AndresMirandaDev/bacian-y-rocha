'use client';
import { Stakeholders } from '@prisma/client';
import { Box, Table, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import colors from '../styles/colors';
import Link from 'next/link';
import Pagination from './Pagination';

interface Props {
  stakeholders: Stakeholders[];
  title: string;
}

const StakeHolderTable = ({ stakeholders, title }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);
  return (
    <>
      <Box className="mb-5 pl-2">
        <Text className="text-xl">{title}</Text>
      </Box>
      <Table.Root variant="surface" className="shadow-lg">
        <Table.Header style={{ backgroundColor: colors.tableHead }}>
          <Table.Row className="text-slate-100">
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Número telefónico</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Correo</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stakeholders
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((provider, index) => (
              <Table.Row
                key={provider.id}
                className={index % 2 === 0 ? colors.tableNthChild : 'bg-white'}
              >
                <Table.Cell>
                  <Link
                    href={`/providers/${provider.id}`}
                    className="text-slate-700 font-bold"
                  >
                    {provider.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{provider.phone}</Table.Cell>
                <Table.Cell>{provider.email}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={currentPage}
        setPage={setPage}
        pageSize={pageSize}
        itemCount={stakeholders.length}
      />
    </>
  );
};

export default StakeHolderTable;
