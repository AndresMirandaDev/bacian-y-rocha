import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const QuoteFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height="2rem" width="50%" />
      <Skeleton height="1rem" width="40%" className="mt-3" />
      <Skeleton height="2rem" width="100%" />
      <Skeleton height="20rem" width="25%" className="mt-10" />
      <Skeleton height="2rem" width="10%" className="mt-5" />
      <Skeleton height="2rem" width="100%" className="mt-5" />
    </Box>
  );
};

export default QuoteFormSkeleton;
