import { Quote } from '@prisma/client';
import { Box, Card, Grid } from '@radix-ui/themes';
import QuoteActions from './QuoteActions';
import QuoteWaitingTable from './QuoteWaitingTable';
import QuotesTable from './QuotesTable';

const getQuotes = async () => {
  const res = await fetch(`https://bacian-y-rocha-next.vercel.app/api/quotes`, {
    cache: 'no-store',
  });

  const quotes = await res.json();

  return quotes.body;
};

const QuotesPage = async () => {
  const quotes = await getQuotes();
  return (
    quotes && (
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
        <Card>
          <QuoteWaitingTable
            quotes={quotes.filter((q: Quote) => q.status === 'PENDING')}
          />
        </Card>
      </Grid>
    )
  );
};

export default QuotesPage;
