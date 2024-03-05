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
import ImageUploader from '../ot/_components/ImageUploader';
import colors from '../styles/colors';
import { UpdateIcon } from '@radix-ui/react-icons';
import GalleryModal from '../ot/_components/GalleryModal';

interface Props {
  receivedSaleOrder?: ReceivedSaleOrder;
}

const ReceivedSaleOrderForm = ({ receivedSaleOrder }: Props) => {
  const router = useRouter();

  const [files, setFiles] = useState<string[]>([]);
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (receivedSaleOrder) {
        await axios.patch(`/api/receivedSaleOrders/${receivedSaleOrder.id}`, {
          files,
          number,
          receivedDate: new Date(date).toISOString(),
        });
        toast.success('Orden de compra actualizada');
        router.refresh();
        setSubmitting(false);
      } else {
        await axios.post('/api/receivedSaleOrders', {
          files,
          number,
          receivedDate: new Date(date).toISOString(),
        });

        toast.success('Orden de compra registrada');
        router.push('/oc/received');
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
      setFiles([...receivedSaleOrder.files]),
        setNumber(receivedSaleOrder.number);
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
          <ImageUploader
            multiple
            allowedFormats={['pdf']}
            setPublicId={(publicId: string) => {
              const updatedFiles = [...files, publicId];
              setFiles(updatedFiles);
            }}
            title="Subir archivos"
          />
          {receivedSaleOrder && (
            <GalleryModal
              photos={files}
              title="Ver archivos adjuntados"
              description="Archivos adjuntados a orden de compra"
              updateFiles={(file: string) => {
                const updatedFiles = files.filter((f) => f !== file);
                setFiles(updatedFiles);
              }}
              updatable
            />
          )}
          <Form.Submit asChild>
            <Button
              disabled={isSubmitting}
              style={{
                backgroundColor: receivedSaleOrder
                  ? colors.buttonColors.green
                  : colors.buttonColors.primary,
              }}
            >
              {receivedSaleOrder && <UpdateIcon />}
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
              route="/api/receivedSaleOrders"
              name="orden de compra"
              pushRoute="/oc/received"
            />
          )}
        </Box>
      </Form.Root>
      <Toaster />
    </>
  );
};

export default ReceivedSaleOrderForm;
