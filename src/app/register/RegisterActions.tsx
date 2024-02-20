import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const RegisterActions = () => {
  return (
    <>
      <Button>
        <PlusIcon />
        <Link href="/register/new">Registrar nuevo usuario</Link>
      </Button>
    </>
  );
};

export default RegisterActions;
