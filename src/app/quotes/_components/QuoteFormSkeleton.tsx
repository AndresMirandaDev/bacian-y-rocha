import { Box, Card, Container, Flex, Grid } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const QuoteFormSkeleton = () => {
  return (
    <Container className="p-3">
      <Box className="p-5">
        <Skeleton width="11%" height="1.5rem" />
      </Box>
      <Grid columns={{ xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }} gap="3">
        <Card>
          <Flex gap="3" direction="column">
            <Flex gap="2" direction="column">
              <Box>
                <Skeleton width="50%" height="1rem" />
                <Skeleton width="100%" height="3rem" />
              </Box>
            </Flex>
            <Flex gap="2" direction="column">
              <Skeleton width="50%" height="1rem" />
              <Skeleton width="100%" height="3rem" />
            </Flex>
            <Flex gap="2" direction="column">
              <Box>
                <Skeleton width="50%" height="1rem" />
                <Skeleton width="100%" height="3rem" />
              </Box>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex gap="3" direction="column">
            <Flex gap="2" direction="column">
              <Skeleton width="50%" height="1rem" />
              <Skeleton width="100%" height="3rem" />
            </Flex>
            <Flex gap="2" direction="column">
              <Skeleton width="50%" height="1rem" />
              <Skeleton width="100%" height="3rem" />
            </Flex>
            <Flex gap="2" direction="column">
              <Skeleton width="55%" height="22rem" />
              <Skeleton width="100%" height="3rem" />
            </Flex>
          </Flex>
        </Card>
      </Grid>
      <Card className="shadow-xl mt-5">
        <Flex direction="column" gap="4">
          <Box className="pl-5">
            <Skeleton width="50%" height="1rem" />
          </Box>
          <Box className="p-5">
            <Skeleton width="90%" height="3rem" />
            <Skeleton width="90%" height="3rem" />
            <Skeleton width="90%" height="3rem" />
          </Box>
        </Flex>
      </Card>
    </Container>
  );
};

export default QuoteFormSkeleton;
