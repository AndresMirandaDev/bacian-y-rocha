import { Button, Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  id: string;
}

const QuoteActions = ({ id }: Props) => {
  return (
    <Container className="p-5">
      <Flex gap="4">
        <Button>
          <Link href={`/quotes/edit/${id}`}>Editar Cotización</Link>
        </Button>
        <Button color="red">Eliminar Cotización</Button>
      </Flex>
    </Container>
  );
};

export default QuoteActions;
