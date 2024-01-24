import { AlertDialog, Box, Button, Flex, IconButton } from '@radix-ui/themes';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  id: string;
}

const DeleteDataDialog = ({ name, id }: Props) => {
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`api/quotes/${id}`);
      toast.success('Los datos han sido eliminados correctamente.');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      toast.error(
        'Los datos no han podido ser eliminados, inténtelo nuevamente.'
      );
      console.log(error);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Box className="text-red-400 cursor-pointer">
            <FaTrash />
          </Box>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>
            ¿Seguro que quieres eliminar {name} ?
          </AlertDialog.Title>
          <AlertDialog.Description>
            ¿Quieres proceder a eliminar {name}? , una vez que se haya
            eliminado, no se podrá recuperar.
          </AlertDialog.Description>
          <AlertDialog.Action className="mt-5">
            <Flex gap="4" justify="end">
              <Button color="red" disabled={isDeleting} onClick={handleDelete}>
                {isDeleting && <Spinner />}Eliminar
              </Button>
              <Button color="gray">Cancelar</Button>
            </Flex>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteDataDialog;
