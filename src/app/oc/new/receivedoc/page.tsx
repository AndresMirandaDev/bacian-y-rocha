import React from 'react';
import ReceivedSaleOrderForm from '../../ReceivedSaleOrderForm';
import { Box, Card, Container, Text } from '@radix-ui/themes';

const NewReceivedSaleOrderPage = () => {
  return (
    <Container className="p-3">
      <Card>
        <ReceivedSaleOrderForm />
      </Card>
    </Container>
  );
};

export default NewReceivedSaleOrderPage;
