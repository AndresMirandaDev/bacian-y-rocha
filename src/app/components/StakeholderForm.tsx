'use client';
import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, Card, Grid } from '@radix-ui/themes';
import FormField from './form/FormField';
import colors from '../styles/colors';
import { Stakeholders } from '@prisma/client';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
import { UpdateIcon } from '@radix-ui/react-icons';

interface Props {
  stakeholder?: Stakeholders;
  type: 'clients' | 'providers';
}
const StakeholderForm = ({ stakeholder, type }: Props) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (stakeholder) {
      setName(stakeholder.name);
      setEmail(stakeholder.email);
      setRut(stakeholder.rut);
      setPhone(stakeholder.phone);
      setCity(stakeholder.city);
    }
  }, [stakeholder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (stakeholder) {
        setSubmitting(true);
        await axios.patch(`/api/${type}/${stakeholder.id}`, {
          name,
          email,
          rut,
          phone,
          city,
        });
        router.push(`/${type}`);
        setSubmitting(false);
        router.refresh();
        toast.success(
          `${type == 'clients' ? 'Cliente' : 'Proveedor'} actualizado`
        );
      } else {
        setSubmitting(true);
        await axios.post(`/api/${type}`, {
          name,
          email,
          rut,
          phone,
          city,
        });
        router.push(`/${type}`);
        setSubmitting(false);
        router.refresh();
        toast.success(
          `${type == 'clients' ? 'Cliente' : 'Proveedor'} registrado`
        );
      }
    } catch (error) {
      console.log(error);
      toast('Ocurrió un error inesperado, inténtelo nuevamente.');
    }
  };

  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <Grid
          gap="4"
          columns={{
            initial: '1',
            xs: '1',
            sm: '1',
            md: '1',
            lg: '2',
            xl: '2',
          }}
          align="center"
        >
          <FormField
            setValue={setName}
            value={name}
            name="name"
            typeMismatch="Nombre inválido"
            valueMissing="Ingrese nombre"
            label="Nombre"
          />
          <FormField
            setValue={setEmail}
            value={email}
            name="email"
            typeMismatch="Correo inválido"
            valueMissing="Ingrese correo"
            label="Correo"
          />
          <FormField
            setValue={setRut}
            value={rut}
            name="rut"
            typeMismatch="Rut inválido"
            valueMissing="Ingrese rut"
            label="RUT"
          />
          <FormField
            setValue={setPhone}
            value={phone}
            name="phone"
            typeMismatch="Correo número telefónico"
            valueMissing="Ingrese número telefónico"
            label="Número telefónico"
          />
          <FormField
            setValue={setCity}
            value={city}
            name="city"
            typeMismatch="Cuidad inválida"
            valueMissing="Ingrese cuidad"
            label="Cuidad"
          />
          <Form.Submit asChild>
            <Button
              style={{
                backgroundColor: stakeholder
                  ? colors.buttonColors.green
                  : colors.buttonColors.primary,
              }}
              className="w-full cursor-pointer col-span-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              {stakeholder && <UpdateIcon />}
              {stakeholder && 'Actualizar'}
              {!stakeholder && 'Registrar'}
            </Button>
          </Form.Submit>
        </Grid>
      </Form.Root>
      <Toaster />
    </>
  );
};

export default StakeholderForm;
