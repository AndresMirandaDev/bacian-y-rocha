'use client';
import * as Form from '@radix-ui/react-form';
import { Box, Button, Callout, Flex, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdDangerous } from 'react-icons/md';
import FileUploader from '../components/cloud/FileUploader';
import FormField from '../components/form/FormField';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { Quote } from '@prisma/client';

interface Props {
  quote?: Quote;
}

const QuoteForm = ({ quote }: Props) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [file, setFile] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (quote) {
      setNumber(quote!.number);
      setFile(quote!.file);
    }
  }, [quote]);

  const errorMessageClassname = 'text-red-500 text-sm opacity-80';
  const inputClassname = 'input input-bordered w-full bg-transparent ';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (quote) {
        setSubmitting(true);
        await axios.patch(`/api/quotes/${quote.id}`, { number, file });
        router.refresh();
        toast.success('Cotización ha sido actualizada.');
      } else {
        setSubmitting(true);
        await axios.post('/api/quotes', { number, file });
        setError('');
        setNumber('');
        setFile('');
        router.refresh();
        toast.success('Se ha registrado una nueva cotización');
      }
    } catch (error) {
      setSubmitting(false);
      setError('Hubo un error inesperado, inténtelo nuevamente');
      console.log(error);
    }
    setSubmitting(false);
  };

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdDangerous />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Flex direction="column" className="min-h-full" justify="between">
        <Box>
          <Text className="text-xl">Registrar Nueva Cotización</Text>
        </Box>
        <Box>
          <Form.Root onSubmit={handleSubmit}>
            <Flex direction="column" gap="9">
              <FormField
                name="number"
                value={number}
                setValue={setNumber}
                typeMismatch="Número Inválido"
                valueMissing="Ingrese número de cotización"
                label="Número de cotización"
                type="number"
              />
              <Box>
                <FileUploader publicId={file} setPublicId={setFile} />
              </Box>
              <Flex gap="4" direction="column">
                <Form.Submit asChild>
                  <Button
                    disabled={isSubmitting}
                    className="bg-[var(--accent-9)]"
                  >
                    {isSubmitting && <Spinner />}
                    {!isSubmitting && !quote && 'Registrar'}
                    {!isSubmitting && quote && 'Actualizar'}
                    {isSubmitting && !quote && 'Registrando'}
                    {isSubmitting && quote && 'Actualizando'}
                  </Button>
                </Form.Submit>
              </Flex>
            </Flex>
          </Form.Root>
        </Box>
      </Flex>
      <Toaster />
    </>
  );
};

export default QuoteForm;
