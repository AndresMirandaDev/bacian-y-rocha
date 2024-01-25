import CldImage from '@/app/components/cloud/CloudImage';
import { Quote } from '@prisma/client';
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Props {
  quote: Quote;
}

const QuoteDetails = async ({ quote }: Props) => {
  const labelStyle = 'text-lg';
  const infoStyle = 'text-xl font-bold text-zinc-800';

  if (!quote) return notFound();
  return (
    <Container className="p-3">
      <Card>
        <Grid columns={{ xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }} gap="3">
          <Card>
            <Flex gap="3" direction="column">
              <Flex gap="2" direction="column">
                <Box>
                  <Text className={labelStyle}>Número de cotización</Text>
                </Box>
                <Box>
                  <Text className={infoStyle}>#{quote.number}</Text>
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Text className={labelStyle}>Fecha de solicitud</Text>
                </Box>
                <Box>
                  <Text className={infoStyle}>
                    {quote.requestedDate.toLocaleDateString()}
                  </Text>
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Text className={labelStyle}>Estado</Text>
                </Box>
                <Box>
                  <Badge
                    size={'2'}
                    color={quote.status === 'PENDING' ? 'yellow' : 'grass'}
                  >
                    {quote.status === 'PENDING' ? 'Pendiente' : 'Enviada'}
                  </Badge>
                </Box>
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex gap="3" direction="column">
              <Flex gap="2" direction="column">
                <Box>
                  <Text className={labelStyle}>Cliente</Text>
                </Box>
                <Box>
                  <Text className={infoStyle}>{quote.customer}</Text>
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Text className={labelStyle}>
                    Fecha de entrega de cotización
                  </Text>
                </Box>
                <Box>
                  <Text className={infoStyle}>
                    {quote.quoteSent?.toLocaleDateString()}
                    {!quote.quoteSent && 'No se ha enviado'}
                  </Text>
                </Box>
              </Flex>
              <Flex gap="2" direction="column">
                <Box>
                  <Text className={labelStyle}>Archivo adjunto</Text>
                </Box>
                <Box>
                  {quote.file === 'pending' && (
                    <Text className={labelStyle}>
                      No se ha adjuntado archivo
                    </Text>
                  )}
                  {quote.file !== 'pending' && (
                    <>
                      <CldImage
                        alt="pdf"
                        src={quote.file}
                        width={200}
                        height={200}
                      />
                    </>
                  )}
                </Box>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </Card>
    </Container>
  );
};

export default QuoteDetails;
