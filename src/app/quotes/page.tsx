import { Box, Button, Card, Grid } from '@radix-ui/themes';
import React from 'react';
import QuotesTable from './QuotesTable';
import prisma from '../../../prisma/client';
import RegisterQuote from './RegisterQuote';

const QuotesPage = async () => {
  const quotes = await prisma.quote.findMany();
  return (
    <Grid>
      <Box className="p-3">
        <RegisterQuote />
      </Box>
      <Card>
        <QuotesTable quotes={quotes} />
      </Card>
    </Grid>
  );
};

export default QuotesPage;
