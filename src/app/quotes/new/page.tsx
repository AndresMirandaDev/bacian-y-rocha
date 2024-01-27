import React from 'react';
import QuoteFormSkeleton from '@/app/quotes/_components/QuoteFormSkeleton';
import dynamic from 'next/dynamic';

const QuoteForm = dynamic(() => import('@/app/quotes/QuoteForm'), {
  ssr: false,
  loading: () => <QuoteFormSkeleton />,
});

const RegisterQuotePage = () => {
  return <QuoteForm />;
};

export default RegisterQuotePage;
