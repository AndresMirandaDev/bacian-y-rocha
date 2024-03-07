'use client';
import { Card, Grid } from '@radix-ui/themes';

import React, { useState } from 'react';
import PositionListItem from './PositionListItem';
import { Position } from '@prisma/client';
import Pagination from '@/app/components/Pagination';

interface Props {
  positions: Position[];
}

const PositionList = ({ positions }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  return (
    <Grid className="p-3">
      {positions
        .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
        .map((p: Position) => {
          return <PositionListItem position={p} key={p.id} />;
        })}
      <Pagination
        setPage={setCurrentPage}
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={positions.length}
      />
    </Grid>
  );
};

export default PositionList;
