import { Box, Card, Grid } from '@radix-ui/themes';
import prisma from '../../../prisma/client';
import QuotesTable from './QuotesTable';
import QuoteActions from './QuoteActions';

const QuotesPage = async () => {
  const quotes = await prisma.quote.findMany();

  return (
    <Grid
      gap="4"
      className="p-3"
      columns={{ initial: '1', sm: '1', md: '1', lg: '1', xl: '1' }}
    >
      <Box>
        <QuoteActions />
      </Box>
      <Card>
        <QuotesTable quotes={quotes} />
      </Card>
    </Grid>
  );
};

export default QuotesPage;
