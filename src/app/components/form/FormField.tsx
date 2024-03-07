'use client';
import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';
import * as Form from '@radix-ui/react-form';
import { TextField } from '@radix-ui/themes';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  valueMissing: string;
  typeMismatch: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  required?: boolean;
}

const FormField = ({
  value,
  setValue,
  valueMissing,
  typeMismatch,
  label,
  type,
  name,
  required = true,
}: Props) => {
  const errorMessageClassname = 'text-red-500 text-sm opacity-80 -z-10';
  const inputClassname = 'input input-bordered w-full bg-transparent ';

  return (
    <Form.Field className="rounded-md" name={name}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {label && <Form.Label className="text-zinc-500 -z">{label}</Form.Label>}
        <Form.Message className={errorMessageClassname} match="valueMissing">
          {valueMissing}
        </Form.Message>
        <Form.Message className={errorMessageClassname} match="typeMismatch">
          {typeMismatch}
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className={inputClassname}
          type={type}
          required={required}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Form.Control>
    </Form.Field>
  );
};

export default FormField;
