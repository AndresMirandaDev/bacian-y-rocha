import { Button, Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import DeleteQuoteButton from './DeleteQuoteButton';
import prisma from '../../../../prisma/client';

interface Props {
  id: string;
}

const QuoteActions = async ({ id }: Props) => {
  const quote = await prisma.quote.findUnique({ where: { id: id } });
  return (
    <Container className="p-5">
      <Flex gap="4">
        <Button>
          <Link href={`/quotes/edit/${id}`}>Editar Cotización</Link>
        </Button>
        <DeleteQuoteButton id={id} />
      </Flex>
    </Container>
  );
};

export default QuoteActions;
