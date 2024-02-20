'use client';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { FaFilePdf, FaRegistered } from 'react-icons/fa6';
import { RiRegisteredFill } from 'react-icons/ri';

const SaleOrderActions = () => {
  return (
    <>
      <Button>
        <PlusIcon />
        <Link href={'/oc/new'}>Emitir orden de compra</Link>
      </Button>
      <Button>
        <FaFilePdf />
        <Link href={'/oc/new/receivedoc'}>Registrar orden de compra</Link>
      </Button>
    </>
  );
};

export default SaleOrderActions;
