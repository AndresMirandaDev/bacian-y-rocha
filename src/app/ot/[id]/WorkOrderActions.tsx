'use client';
import DeleteDataDialog from '@/app/components/DeleteDataDialog';
import { UpdateIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  id: string;
}

const WorkOrderActions = ({ id }: Props) => {
  return (
    <Flex className="p-3" direction="column" gap="4">
      <Button style={{ backgroundColor: '#3E63DD' }}>
        <UpdateIcon />
        <Link href={`/ot/edit/${id}`}>Actualizar orden de trabajo</Link>
      </Button>
      <DeleteDataDialog
        id={id}
        route="/api/workorders"
        pushRoute="/ot"
        name="Orden de trabajo"
      />
    </Flex>
  );
};

export default WorkOrderActions;
