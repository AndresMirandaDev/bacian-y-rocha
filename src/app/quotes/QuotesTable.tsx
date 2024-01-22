'use client';
import { Table } from '@radix-ui/themes';
import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import { Quote } from '@prisma/client';

interface Props {
  quotes: Quote[];
}

const QuotesTable = ({ quotes }: Props) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setPage] = useState(0);

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header className="bg-blue-300">
          <Table.Row>
            <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Archivo</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {quotes
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((quote) => {
              return (
                <Table.Row key={quote.id}>
                  <Table.Cell className="font-bold">#{quote.number}</Table.Cell>
                  <Table.Cell>{quote.file}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={quotes.length}
        currentPage={currentPage}
        pageSize={pageSize}
        setPage={setPage}
      />
    </>
  );
};

export default QuotesTable;
