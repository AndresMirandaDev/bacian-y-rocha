import { Box, Card, Grid, Flex, Container } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const QuoteFormm = () => {
  return (
    <Container className="p-3">
      <Box className="p-5">
        <Skeleton width="13%" height="2rem" inline />
        <Skeleton width="13%" height="2rem" inline className="ml-5" />
      </Box>
      <Card>
        <Grid columns={{ xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }} gap="3">
          <Card>
            <Flex gap="3" direction="column">
              <Flex gap="2" direction="column">
                <Box>
                  <Skeleton width="50%" height="2rem" />
                </Box>
                <Box>
                  <Skeleton width="20%" />
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Skeleton width="50%" height="2rem" />
                </Box>
                <Box>
                  <Skeleton width="40%" />
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Skeleton width="50%" height="2rem" />
                </Box>
                <Box>
                  <Skeleton width="40%" />
                </Box>
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex gap="3" direction="column">
              <Flex gap="2" direction="column">
                <Box>
                  <Skeleton width="50%" height="2rem" />
                </Box>
                <Box>
                  <Skeleton width="40%" />
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Skeleton width="50%" height="2rem" />
                </Box>
                <Box>
                  <Skeleton width="40%" />
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Skeleton width="50%" height="2rem" />
                </Box>
                <Box>
                  <Skeleton width="50%" height="10rem" />
                  <Skeleton width="25%" height="2rem" />
                </Box>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </Card>
    </Container>
  );
};

export default QuoteFormm;
