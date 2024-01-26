'use client';
import { Quote, QuoteStatus } from '@prisma/client';
import * as Form from '@radix-ui/react-form';
import { PlusIcon, TrashIcon, UpdateIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Select,
  Text,
} from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import FileUploader from '../components/cloud/FileUploader';
import FormField from '../components/form/FormField';
import { formatDate } from '../helpers/formatDate';

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
  const [details, setDetails] = useState([{ description: '', id: '1' }]);

  useEffect(() => {
    if (quote) {
      setNumber(quote.number);
      setStatus(quote.status);
      setCustomer(quote.customer);
      setRequestedDate(formatDate(quote.requestedDate.toISOString()));
      setFile(quote.file);
      setDetails(quote.details);
      if (quote.quoteSent) {
        setQuoteSent(formatDate(quote.quoteSent.toISOString()));
      }
    }
  }, [quote]);

  const handleDetailsChange = (
    e: React.FormEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const updatedDescription = [...details];
    updatedDescription[rowIndex].description = (
      e.target as HTMLInputElement
    ).value;
    setDetails(updatedDescription);
  };

  const handleAddRow = () => {
    setDetails([
      ...details,
      {
        description: '',
        id: (Math.random() * 1000).toString(),
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (quote) {
        console.log('actualizando');
        console.log({
          number,
          customer,
          requestedDate: new Date(requestedDate).toISOString(),
          quoteSent: quoteSent ? new Date(requestedDate).toISOString() : null,
          status,
          file,
          details,
        });
      } else if (!quote) {
        console.log('registrando');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const labelStyle = 'text-lg font-light text-zinc-500';
  return (
    <Container className="p-3">
      <Form.Root onSubmit={handleSubmit}>
        <Box className="p-5">
          <Button color={quote ? 'green' : 'indigo'}>
            {quote && <UpdateIcon />}
            {quote ? 'Actualizar' : 'Registrar nueva cotización'}
          </Button>
        </Box>
        <Grid columns={{ xs: '1', sm: '1', md: '1', lg: '2', xl: '2' }} gap="3">
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
                <Select.Root
                  value={status}
                  onValueChange={(status) => setStatus(status)}
                  defaultValue={quote ? quote.status : QuoteStatus.PENDING}
                >
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
                  required={false}
                />
              </Flex>
              <Flex gap="2" direction="column">
                <FileUploader publicId={file} setPublicId={setFile} />
              </Flex>
            </Flex>
          </Card>
        </Grid>
        <Card className="shadow-xl">
          <Flex direction="column" gap="4">
            <Box className="flex justify-between">
              <Text className={labelStyle}>
                Cotización solicitada por los siguientes servicios:
              </Text>
              <Button onClick={handleAddRow}>
                <PlusIcon />
                Agregar
              </Button>
            </Box>
            <Box className="p-5">
              {details.map((item, index) => {
                return (
                  <Form.Field name="description" key={item.id}>
                    <Box className="flex items-center mt-3">
                      <Box className="flex items-baseline justify-between flex-col flex-grow">
                        <Form.Control asChild>
                          <input
                            className="input input-bordered w-[95%] bg-transparent"
                            type="text"
                            required
                            onChange={(e) => handleDetailsChange(e, index)}
                            value={item.description}
                          />
                        </Form.Control>
                      </Box>
                      <Box
                        className="flex items-center rounded-full bg-red-400 p-2"
                        onClick={() => {
                          setDetails(
                            details.filter((field) => {
                              return field.id !== item.id;
                            })
                          );
                        }}
                      >
                        <TrashIcon color="white" />
                      </Box>
                    </Box>
                  </Form.Field>
                );
              })}
            </Box>
          </Flex>
        </Card>
      </Form.Root>
    </Container>
  );
};

export default QuoteFormm;
