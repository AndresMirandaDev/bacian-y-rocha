import { notFound } from 'next/navigation';
import prisma from '../../../../prisma/client';
import QuoteDetails from './QuoteDetails';

interface Params {
  params: { id: string };
}

const DetailsPage = async ({ params }: Params) => {
  const quote = await prisma.quote.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!quote) return notFound();
  return <QuoteDetails quote={quote} />;
};

export default DetailsPage;
