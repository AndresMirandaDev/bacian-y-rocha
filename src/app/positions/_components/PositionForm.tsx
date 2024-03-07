'use client';
import { Position } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Button, Card, Grid, Text } from '@radix-ui/themes';
import FormField from '@/app/components/form/FormField';
import colors from '@/app/styles/colors';
import { UpdateIcon } from '@radix-ui/react-icons';
import Spinner from '@/app/components/Spinner';
import DeleteDataDialog from '@/app/components/DeleteDataDialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  position?: Position;
}

const PositionForm = ({ position }: Props) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (position) {
      setName(position.name);
      setValue(position.value.toString());
    }
  }, [position]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (position) {
        setSubmitting(true);
        await axios.patch(`/api//positions/${position.id}`, {
          name,
          value: parseInt(value),
        });
        toast.success('Se ha agregado nueva posición');
        router.push('/positions');
        router.refresh();
        setSubmitting(false);
      } else {
        setSubmitting(true);
        await axios.post('/api/positions', {
          name,
          value: parseInt(value),
        });
        toast.success('Se ha agregado nueva posición');
        router.push('/positions');
        router.refresh();
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `No se ha podido ${
          position ? 'actualizar' : 'registrar'
        } posición, inténtelo nuevamente.`
      );
      setSubmitting(false);
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Card>
        <Box className="mb-5">
          <Text className="text-xl">
            {position ? 'Actualizar posición' : 'Registrar posición'}
          </Text>
        </Box>
        <Grid gap="4">
          <FormField
            value={name}
            name="name"
            setValue={setName}
            valueMissing="Nombre requerido"
            typeMismatch="Nombre invalido"
            label="Nombre"
          />
          <FormField
            value={value}
            name="value"
            setValue={setValue}
            valueMissing="Valor requerido"
            typeMismatch="Valor invalido"
            label="Valor(Hora)"
            type="number"
          />
          <Form.Submit asChild>
            <Button
              disabled={isSubmitting}
              style={{
                backgroundColor: position
                  ? colors.buttonColors.green
                  : colors.buttonColors.primary,
              }}
            >
              {position && <UpdateIcon />}
              {isSubmitting && <Spinner />}
              {position ? 'Actualizar posición' : 'Registrar posición'}
            </Button>
          </Form.Submit>
          {position && (
            <DeleteDataDialog
              id={position.id}
              route="/api/positions"
              name="posición"
              pushRoute="/positions"
            />
          )}
        </Grid>
      </Card>
    </Form.Root>
  );
};

export default PositionForm;
