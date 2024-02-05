'use client';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const SaleOrderActions = () => {
  return (
    <Button>
      <PlusIcon />
      <Link href={'/oc/new'}>Nueva orden de compra</Link>
    </Button>
  );
};

export default SaleOrderActions;
