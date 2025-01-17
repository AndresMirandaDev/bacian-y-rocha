import { Box, Card, Container } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import prisma from '../../../../../prisma/client';
import dynamic from 'next/dynamic';
import QuoteFormSkeleton from '@/app/quotes/_components/QuoteFormSkeleton';

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
    <Container className="p-3">
      <Box>
        <QuoteForm quote={quote} />
      </Box>
    </Container>
  );
};

export default QuoteDetails;
