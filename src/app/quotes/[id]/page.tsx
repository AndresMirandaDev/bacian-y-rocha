import { Box, Card } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import prisma from '../../../../prisma/client';
import dynamic from 'next/dynamic';
import QuoteFormSkeleton from '../_components/QuoteFormSkeleton';

const QuoteForm = dynamic(() => import('@/app/quotes/QuoteForm'), {
  ssr: false,
  loading: () => <QuoteFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const QuoteDetails = async ({ params }: Props) => {
  const quote = await prisma.quote.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!quote) return notFound();
  return (
    <Card>
      <Box>
        <QuoteForm quote={quote} />
      </Box>
    </Card>
  );
};

export default QuoteDetails;
