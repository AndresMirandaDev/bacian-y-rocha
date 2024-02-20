'use client';
import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Button, Grid, Text } from '@radix-ui/themes';
import FormField from '../components/form/FormField';
import toast, { Toaster } from 'react-hot-toast';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (user) {
        setSubmitting(true);
        axios.patch(`/api/users/${user.id}`, {
          name,
          email,
          password,
          phone,
        });
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        router.push('/register');
        toast.success('Usuario ha sido actualizado');
        setSubmitting(false);
        router.refresh();
      } else {
        setSubmitting(true);
        axios.post('/api/users', {
          name,
          email,
          password,
          phone,
        });
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        router.push('/register');
        toast.success('Usuario ha sido registrado');
        setSubmitting(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        'No se ha podido registrar nuevo usuario, inténtelo nuevamente.'
      );
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <Box className="mb-5 pl-2">
          <Text className="text-xl">Registrar nuevo usuario</Text>
        </Box>
        <Grid gap="4">
          <Box>
            <FormField
              value={name}
              setValue={setName}
              name="name"
              typeMismatch="Nombre invalido"
              valueMissing="Ingrese nombre"
              label="Nombre*"
            />
          </Box>
          <Box>
            <FormField
              value={email}
              setValue={setEmail}
              name="email"
              typeMismatch="Email invalido"
              valueMissing="Ingrese email"
              label="Email*"
              type="email"
            />
          </Box>
          <Box>
            <FormField
              value={password}
              setValue={setPassword}
              name="password"
              typeMismatch="Contraseña invalida"
              valueMissing="Ingrese contraseña"
              label="Contraseña*"
              type="password"
            />
          </Box>
          <Box>
            <FormField
              value={phone}
              setValue={setPhone}
              name="phone"
              typeMismatch="Numero invalido"
              valueMissing="Ingrese numero telefónico"
              label="Numero telefónico"
              required={false}
            />
          </Box>
          <Box>
            <Form.Submit asChild>
              <Button
                style={{ backgroundColor: '#3E63DD' }}
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner />}
                Registrar usuario
              </Button>
            </Form.Submit>
          </Box>
        </Grid>
      </Form.Root>
      <Toaster />
    </>
  );
};

export default UserForm;
