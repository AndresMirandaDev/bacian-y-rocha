import React from 'react';
import DetailsSkeleton from './DetailsSkeleton';
import dynamic from 'next/dynamic';
import prisma from '../../../../prisma/client';
import { notFound } from 'next/navigation';

const QuoteDetails = dynamic(() => import('@/app/quotes/[id]/QuoteDetails'), {
  ssr: false,
  loading: () => <DetailsSkeleton />,
});

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
