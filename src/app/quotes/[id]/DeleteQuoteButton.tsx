'use client';
import Spinner from '@/app/components/Spinner';
import { Quote } from '@prisma/client';
import { AlertDialog, Box, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  id: string;
}

const DeleteQuoteButton = ({ id }: Props) => {
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();

  console.log(id);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/quotes/${id}`);
      router.push('/quotes');
      router.refresh();
    } catch (error) {
      toast.error('Cotización no pudo ser eliminada, inténtelo nuevamente.');
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button disabled={isDeleting} color="red">
          {isDeleting && <Spinner />}
          Eliminar Cotización
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>¿Eliminar cotización?</AlertDialog.Title>
        <AlertDialog.Description>
          ¿Está seguro que quiere eliminar este presupuesto? Una vez eliminado
          no podrá ser recuperado.
        </AlertDialog.Description>
        <AlertDialog.Action>
          <Flex gap="4" justify="end">
            <Button color="gray">Cancelar</Button>
            <Button color="red" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting && <Spinner />}
              Eliminar
            </Button>
          </Flex>
        </AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteQuoteButton;
