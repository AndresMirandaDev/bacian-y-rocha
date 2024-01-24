'use client';
import { Button, Card, Dialog, Flex, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import FormField from '../components/form/FormField';

const RegisterQuote = () => {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [file, setFile] = useState('');

  const errorMessageClassname = 'text-red-500 text-sm opacity-80';
  const inputClassname = 'input input-bordered w-full bg-transparent ';
  return (
    <>
      <Dialog.Root onOpenChange={() => setOpen(!open)}>
        <Dialog.Trigger>
          <Button>
            {!open ? 'Registrar Cotización' : 'Cerrar Formulario'}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Registrar Cotización</Dialog.Title>
          <Form.Root>
            <Flex direction="column">
              <FormField
                value={number}
                setValue={setNumber}
                label="Número de cotización"
                valueMissing="Ingrese número de cotización"
                typeMismatch="Número inválido"
                type="number"
              />
            </Flex>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default RegisterQuote;
