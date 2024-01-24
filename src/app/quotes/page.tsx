import { Box, Card, Grid, Separator } from '@radix-ui/themes';
import prisma from '../../../prisma/client';
import QuotesTable from './QuotesTable';
import RegisterQuote from './RegisterQuote';
import FileUploader from '../components/cloud/FileUploader';
import { SyntheticEvent } from 'react';

const QuotesPage = async () => {
  const quotes = await prisma.quote.findMany();

  return (
    <Grid
      gap="4"
      className="p-3"
      columns={{ initial: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
    >
      <Card>
        <RegisterQuote />
      </Card>
      <Card>
        <QuotesTable quotes={quotes} />
      </Card>
    </Grid>
  );
};

export default QuotesPage;
