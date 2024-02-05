'use client';
import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import FormField from '../components/form/FormField';
import FileUploader from '../components/cloud/FileUploader';
import { ReceivedSaleOrder } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';
import { formatDate } from '../helpers/formatDate';
import DeleteDataDialog from '../components/DeleteDataDialog';

interface Props {
  receivedSaleOrder?: ReceivedSaleOrder;
}

const ReceivedSaleOrderForm = ({ receivedSaleOrder }: Props) => {
  const router = useRouter();

  const [file, setFile] = useState('pending');
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (receivedSaleOrder) {
        await axios.patch(`/api/receivedsaleorders/${receivedSaleOrder.id}`, {
          file,
          number,
          receivedDate: new Date(date).toISOString(),
        });
        toast.success('Orden de compra aactualizada');
        router.refresh();
        setSubmitting(false);
      } else {
        await axios.post('/api/receivedsaleorders', {
          file,
          number,
          receivedDate: new Date(date).toISOString(),
        });

        toast.success('Orden de compra registrada');
        router.push('/oc');
        router.refresh();
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error inesperado, inténtelo nuevamente.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (receivedSaleOrder) {
      setFile(receivedSaleOrder.file), setNumber(receivedSaleOrder.number);
      setDate(formatDate(receivedSaleOrder.receivedDate.toLocaleDateString()));
    }
  }, [receivedSaleOrder]);
  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <Box className="mb-5">
          <Text className="text-xl">
            {receivedSaleOrder
              ? 'Actualizar orden de compra'
              : 'Registrar orden de compra'}
          </Text>
        </Box>
        <Flex direction="column" gap="4">
          <FormField
            name="number"
            setValue={setNumber}
            value={number}
            valueMissing="Ingrese número de o.c."
            typeMismatch="Número invàlido"
            label="Número de O.C"
          />
          <FormField
            name="date"
            setValue={setDate}
            value={date}
            valueMissing="Ingrese Fecha"
            typeMismatch="Fecha invàlida"
            label="Fecha"
            type="date"
          />

          <Text className="text-zinc-500">Archivo PDF</Text>
          <FileUploader publicId={file} setPublicId={setFile} />
          <Form.Submit asChild>
            <Button disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              {receivedSaleOrder
                ? 'Actualizar Orden de Compra'
                : 'Registrar Orden de Compra'}
            </Button>
          </Form.Submit>
        </Flex>
        <Box className="mt-5">
          {receivedSaleOrder && (
            <DeleteDataDialog
              id={receivedSaleOrder.id}
              route="/api/receivedsaleorders"
              name="orden de compra"
              pushRoute="/oc"
            />
          )}
        </Box>
      </Form.Root>
      <Toaster />
    </>
  );
};

export default ReceivedSaleOrderForm;
