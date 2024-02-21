'use client';
import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Button, Grid, Text } from '@radix-ui/themes';
import FormField from '../components/form/FormField';
import toast, { Toaster } from 'react-hot-toast';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';
import { UpdateIcon } from '@radix-ui/react-icons';

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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.phone) {
        setPhone(user.phone);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        const updatedUser: {
          name: string;
          email: string;
          password?: string;
          phone?: string;
        } = {
          name,
          email,
          phone,
        };
        if (password !== '') {
          updatedUser.password = password;
        }
        setSubmitting(true);
        await axios.patch(`/api/users/${user.id}`, updatedUser);
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
        await axios.post('/api/users', {
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
          <Text className="text-xl">
            {user ? 'Actualizar usuario' : 'Registrar usuario'}
          </Text>
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
              required={user ? false : true}
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
              required={user ? false : true}
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
              required={user ? false : true}
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
                style={{ backgroundColor: user ? '#2ebb45' : '#3E63DD' }}
                disabled={isSubmitting}
              >
                {user && <UpdateIcon />}
                {isSubmitting && <Spinner />}
                {user ? 'Actualizar usuario' : 'Registrar usuario'}
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
