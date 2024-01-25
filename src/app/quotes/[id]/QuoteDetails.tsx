import CldImage from '@/app/components/cloud/CloudImage';
import { Quote } from '@prisma/client';
import {
  Badge,
  Blockquote,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import QuoteActions from './QuoteActions';

interface Props {
  quote: Quote;
}

const QuoteDetails = async ({ quote }: Props) => {
  const labelStyle = 'text-lg font-light';
  const infoStyle = 'text-xl font-semibold text-zinc-800';

  if (!quote) return notFound();
  return (
    <Container className="p-3">
      <QuoteActions id={quote.id} />
      <Flex direction="column" gap="4">
        <Card className="shadow-xl">
          <Grid
            columns={{ xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
            gap="3"
          >
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
                      <Text className={infoStyle}>
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
        <Card className="shadow-xl">
          <Flex direction="column" gap="4">
            <Box>
              <Text className={labelStyle}>
                Cliente {quote.customer} ha solicitado cotización por los
                siguientes servicios:
              </Text>
            </Box>
            <Box className="p-5">
              {quote.details.map((item, index) => {
                return (
                  <Blockquote className="capitalize text-xl">
                    {index + 1}.-
                    {item.description}
                  </Blockquote>
                );
              })}
            </Box>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
};

export default QuoteDetails;
