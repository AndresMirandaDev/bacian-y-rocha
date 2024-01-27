'use client';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const QuoteActions = () => {
  return (
    <Button>
      <PlusIcon />
      <Link href={'/quotes/new'}>Registrar Cotización</Link>
    </Button>
  );
};

export default QuoteActions;
