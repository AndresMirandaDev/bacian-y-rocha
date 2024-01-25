import {
  Card,
  Grid,
  Flex,
  Box,
  Badge,
  Text,
  Container,
} from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';

const DetailsSkeleton = () => {
  return (
    <Container className="p-3">
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

export default DetailsSkeleton;
