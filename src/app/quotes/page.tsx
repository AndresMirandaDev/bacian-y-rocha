import { Card, Grid } from '@radix-ui/themes';
import prisma from '../../../prisma/client';
import QuotesTable from './QuotesTable';
import QuoteForm from './QuoteForm';
import MovingBackground from '../components/background/MovingBackground';

const QuotesPage = async () => {
  const quotes = await prisma.quote.findMany();

  return (
    <Grid
      gap="4"
      className="p-3"
      columns={{ initial: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
    >
      <Card>
        <QuoteForm />
      </Card>
      <Card>
        <QuotesTable quotes={quotes} />
      </Card>
    </Grid>
  );
};

export default QuotesPage;
