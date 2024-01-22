import { Box, Button, Card, Grid, Separator } from '@radix-ui/themes';
import React from 'react';
import QuotesTable from './QuotesTable';
import prisma from '../../../prisma/client';
import RegisterQuote from './RegisterQuote';

const QuotesPage = async () => {
  const quotes = await prisma.quote.findMany();
  return (
    <Grid gap="4" className="p-3">
      <Box className="pt-3">
        <RegisterQuote />
      </Box>
      <Separator size="4" />
      <Card>
        <QuotesTable quotes={quotes} />
      </Card>
    </Grid>
  );
};

export default QuotesPage;
