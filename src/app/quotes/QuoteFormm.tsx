'use client';
import {
  Box,
  Card,
  Grid,
  Flex,
  Container,
  Button,
  Text,
  Select,
} from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Form from '@radix-ui/react-form';
import FormField from '../components/form/FormField';
import { Quote, QuoteStatus } from '@prisma/client';
import FileUploader from '../components/cloud/FileUploader';

interface Props {
  quote?: Quote;
}

const QuoteFormm = ({ quote }: Props) => {
  const [number, setNumber] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [status, setStatus] = useState('');
  const [customer, setCustomer] = useState('');
  const [quoteSent, setQuoteSent] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    if (quote) {
      setNumber(quote.number);
      setStatus(quote.status);
      setCustomer(quote.customer);
      setFile(quote.file);
    }
  }, [quote]);

  const labelStyle = 'text-lg font-light text-zinc-500';
  return (
    <Container className="p-3">
      <Box className="p-5">
        <Button color="grass">Actualizar</Button>
      </Box>
      <Card>
        <Form.Root>
          <Grid
            columns={{ xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }}
            gap="3"
          >
            <Card>
              <Flex gap="3" direction="column">
                <Flex gap="2" direction="column">
                  <Box>
                    <FormField
                      value={number}
                      setValue={setNumber}
                      typeMismatch="Número Inválido"
                      label="Número de cotización"
                      valueMissing="Ingrese número de cotización"
                      name="number"
                      type="number"
                    />
                  </Box>
                </Flex>
                <Flex gap="2" direction="column">
                  <FormField
                    value={requestedDate}
                    setValue={setRequestedDate}
                    typeMismatch="Fecha inválida"
                    label="Fecha de Solicitud"
                    valueMissing="Ingrese Fecha de solicitud"
                    name="requestedDate"
                    type="date"
                  />
                </Flex>
                <Flex gap="2" direction="column">
                  <Box>
                    <Text className={labelStyle}>Estado</Text>
                  </Box>
                  <Select.Root value={status}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value={QuoteStatus.PENDING}>
                        Pendiente
                      </Select.Item>
                      <Select.Item value={QuoteStatus.FINISHED}>
                        Enviada
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Flex>
            </Card>
            <Card>
              <Flex gap="3" direction="column">
                <Flex gap="2" direction="column">
                  <FormField
                    value={customer}
                    setValue={setCustomer}
                    typeMismatch="Nombre Inválido"
                    label="Cliente"
                    valueMissing="Ingrese nombre de cliente"
                    name="customer"
                    type="text"
                  />
                </Flex>
                <Flex gap="2" direction="column">
                  <FormField
                    value={quoteSent}
                    setValue={setQuoteSent}
                    typeMismatch="Fecha inválida"
                    label="Fecha de entrega de cotización"
                    valueMissing="Ingrese fecha de entrega"
                    name="quoteSent"
                    type="date"
                  />
                </Flex>
                <Flex gap="2" direction="column">
                  <FileUploader publicId={file} setPublicId={setFile} />
                </Flex>
              </Flex>
            </Card>
          </Grid>
        </Form.Root>
      </Card>
    </Container>
  );
};

export default QuoteFormm;
