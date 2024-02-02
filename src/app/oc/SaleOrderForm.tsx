'use client';
import { Box, Flex, Button, Table, Grid, Text } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import logo from '../../../public/assets/images/byrs.png';
import qualitySeal from '../../../public/assets/images/sellocalidad.jpg';

import Image from 'next/image';
import FormField from '../components/form/FormField';
import { SaleOrder, Status } from '@prisma/client';
import { formatDate } from '../helpers/formatDate';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

interface Props {
  saleOrder?: SaleOrder;
}

type Material = {
  name: string;
  unitPrice: number;
  quantity: number;
  code: string;
  id: string;
  [key: string]: string | number; // Index signature
};

const SaleOrderForm = ({ saleOrder }: Props) => {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [providerName, setProviderName] = useState('');
  const [providerAddress, setProviderAddress] = useState('');
  const [providerLine, setProviderLine] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [providerRut, setProviderRut] = useState('');
  const [providerCity, setProviderCity] = useState('');
  const [providerPhone, setProviderPhone] = useState('');
  const [providerContact, setProviderContact] = useState('');
  const [accordingToQuote, setAccordingToQuote] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [emittedBy, setEmittedBy] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [status, setStatus] = useState<Status>('PENDING');
  const [discount, setDiscount] = useState('');
  const [materials, setMaterials] = useState<Material[]>([
    { code: '', name: '', quantity: 0, unitPrice: 0, id: '1' },
  ]);

  //totales de orden de compra
  const [netTotal, setNetTotal] = useState(0);
  const [fullTotal, setFullTotal] = useState(0);

  useEffect(() => {
    if (saleOrder) {
      setNumber(saleOrder.number);
      setDate(formatDate(saleOrder.date.toISOString()));
      setProviderName(saleOrder.providerName);
      setProviderAddress(saleOrder.providerAddress);
      setProviderLine(saleOrder.providerLine);
      setProviderEmail(saleOrder.providerEmail);
      setProviderRut(saleOrder.providerRut);
      setProviderCity(saleOrder.providerCity);
      setProviderPhone(saleOrder.providerPhone);
      setProviderContact(saleOrder.providerContact);
      setAccordingToQuote(saleOrder.accordingToQuote);
      setRequestedBy(saleOrder.requestedBy);
      setEmittedBy(saleOrder.emittedBy);
      setApprovedBy(saleOrder.approvedBy);
      setStatus(saleOrder.status);
      setDiscount(saleOrder.discount.toString());
    }
  }, [saleOrder]);

  useEffect(() => {
    recalculateTotals();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (saleOrder) {
        console.log('actualizando');
      } else {
        console.log('creando');
      }
    } catch (error) {
      console.log('error');
    }
  };

  const handleDetailsChange = (
    e: React.FormEvent<HTMLInputElement>,
    rowIndex: number,
    fieldName: string
  ) => {
    const updatedMaterials = [...materials];
    updatedMaterials[rowIndex][fieldName] = (
      e.target as HTMLInputElement
    ).value;
    setMaterials(updatedMaterials);
    recalculateTotals();
  };

  const handleAddRow = () => {
    setMaterials([
      ...materials,
      {
        name: '',
        code: '',
        quantity: 0,
        unitPrice: 0,
        id: (Math.random() * 1000).toString(),
      },
    ]);
    recalculateTotals();
  };

  const recalculateTotals = () => {
    const netTotal = materials.reduce((accumulator, m) => {
      return accumulator + m.quantity * m.unitPrice;
    }, 0);
    setNetTotal(netTotal);
  };

  const fieldNameStyle = 'font-bold';

  console.log('discount', discount);
  return (
    <Form.Root onSubmit={handleSubmit}>
      <Box className="bg-white rounded-md p-5">
        <Flex
          className="mb-5"
          direction={{
            initial: 'column',
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
        >
          <Flex
            className="p-2 border border-black w-1/2"
            gap="3"
            direction="column"
          >
            <Box>
              <Text className="text-xl">Estado de orden de compra</Text>
            </Box>

            <Flex direction="column" gap="4">
              <Form.Submit asChild>
                <Button>Actualizar</Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Flex>
        <Box className="border-black border-2 p-5">
          {/* Cabecera de documento */}
          <Flex className="justify-around" gap="9" align="center">
            <Box>
              <Image src={logo} alt="logo" height={200} width={200} />
            </Box>
            <Flex direction="column" justify="center" align="center">
              <Box className="flex gap-4">
                <Text className="text-2xl font-bold">Orden de Compra</Text>
                <FormField
                  valueMissing="Campo requerido"
                  value={number}
                  setValue={setNumber}
                  typeMismatch="número inválido"
                  type="text"
                  name="number"
                  required
                />
              </Box>
              <Box>
                <FormField
                  valueMissing="Campo requerido"
                  value={date}
                  setValue={setDate}
                  typeMismatch="Fecha inválida"
                  type="date"
                  name="date"
                  required
                  label="Fecha"
                />
              </Box>
            </Flex>
          </Flex>
          {/* Cabecera de documento */}

          {/* Informacion del proveedor */}
          <Flex
            className="border border-black p-2"
            direction={{
              initial: 'column',
              xs: 'column',
              sm: 'column',
              md: 'column',
              lg: 'row',
              xl: 'row',
            }}
          >
            <Flex direction="column" grow="1">
              <Flex>
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>SEÑOR</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerName}
                    setValue={setProviderName}
                    typeMismatch="Nombre inválida"
                    type="text"
                    name="providerName"
                    required
                  />
                </Flex>
              </Flex>
              <Flex>
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>DIRECCIÓN</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerAddress}
                    setValue={setProviderAddress}
                    typeMismatch="Dirección inválido"
                    type="text"
                    name="providerAddress"
                    required
                  />
                </Flex>
              </Flex>
              <Flex>
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>GIRO</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerLine}
                    setValue={setProviderLine}
                    typeMismatch="Giro inválido"
                    type="text"
                    name="providerLine"
                    required
                  />
                </Flex>
              </Flex>
              <Flex>
                <Flex className=" w-1/2" align="center">
                  <Text className={fieldNameStyle}>EMAIL</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerEmail}
                    setValue={setProviderEmail}
                    typeMismatch="email inválido"
                    type="email"
                    name="providerEmail"
                    required
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column" grow="1">
              <Flex gap="4">
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>RUT</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerRut}
                    setValue={setProviderRut}
                    typeMismatch="Rut inválido"
                    type="text"
                    name="providerRut"
                    required
                  />
                </Flex>
              </Flex>
              <Flex gap="4">
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>CIUDAD</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerCity}
                    setValue={setProviderCity}
                    typeMismatch="Ciudad inválida"
                    type="text"
                    name="providerCity"
                    required
                  />
                </Flex>
              </Flex>
              <Flex gap="4">
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>FONO</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerPhone}
                    setValue={setProviderPhone}
                    typeMismatch="Número inválido"
                    type="text"
                    name="providerPhone"
                    required
                  />
                </Flex>
              </Flex>
              <Flex gap="4">
                <Flex className="w-1/2" align="center">
                  <Text className={fieldNameStyle}>CONTACTO</Text>
                </Flex>
                <Flex grow="1" justify="start">
                  <FormField
                    valueMissing="Campo requerido"
                    value={providerContact}
                    setValue={setProviderContact}
                    typeMismatch="Nombre inválida"
                    type="text"
                    name="providerContact"
                    required
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {/* Informacion del proveedor */}

          <Box className="p-3">
            <Text className="font-bold">* Según Cotización Nr a</Text>
          </Box>

          {/* Tabla de materiales */}
          <Box>
            <Grid columns="5">
              <Box className="border border-black">
                <Text className="font-bold">CANTIDAD</Text>
              </Box>
              <Box className="border border-black">
                <Text className="font-bold">CÓDIGO</Text>
              </Box>
              <Box className="border border-black">
                <Text className="font-bold">ARTÍCULO</Text>
              </Box>
              <Box className="border border-black">
                <Text className="font-bold">VALOR UNIT.</Text>
              </Box>
              <Box className="border border-black">
                <Text className="font-bold">VALOR TOTAL</Text>
              </Box>
            </Grid>
            <Box className="mt-5">
              <Button onClick={handleAddRow}>
                <PlusIcon />
                Agregar Insumo
              </Button>
            </Box>
            {materials.map((m, index) => {
              return (
                <Grid columns="5" align="center">
                  <Box>
                    <Form.Field name="description">
                      <Box className="flex items-center mt-3">
                        <Box className="flex items-baseline justify-between flex-col flex-grow">
                          <Form.Control asChild>
                            <input
                              className="input input-bordered w-[95%] bg-transparent"
                              type="text"
                              required
                              onChange={(e) =>
                                handleDetailsChange(e, index, 'quantity')
                              }
                              value={m.quantity}
                            />
                          </Form.Control>
                        </Box>
                      </Box>
                    </Form.Field>
                  </Box>
                  <Box>
                    <Form.Field name="description">
                      <Box className="flex items-center mt-3">
                        <Box className="flex items-baseline justify-between flex-col flex-grow">
                          <Form.Control asChild>
                            <input
                              className="input input-bordered w-[95%] bg-transparent"
                              type="text"
                              required
                              onChange={(e) =>
                                handleDetailsChange(e, index, 'code')
                              }
                              value={m.code}
                            />
                          </Form.Control>
                        </Box>
                      </Box>
                    </Form.Field>
                  </Box>
                  <Box>
                    <Form.Field name="description">
                      <Box className="flex items-center mt-3">
                        <Box className="flex items-baseline justify-between flex-col flex-grow">
                          <Form.Control asChild>
                            <input
                              className="input input-bordered w-[95%] bg-transparent"
                              type="text"
                              required
                              onChange={(e) =>
                                handleDetailsChange(e, index, 'name')
                              }
                              value={m.name}
                            />
                          </Form.Control>
                        </Box>
                      </Box>
                    </Form.Field>
                  </Box>
                  <Box>
                    <Form.Field name="description">
                      <Box className="flex items-center mt-3">
                        <Box className="flex items-baseline justify-between flex-col flex-grow">
                          <Form.Control asChild>
                            <input
                              className="input input-bordered w-[95%] bg-transparent"
                              type="text"
                              required
                              onChange={(e) =>
                                handleDetailsChange(e, index, 'unitPrice')
                              }
                              value={m.unitPrice}
                            />
                          </Form.Control>
                        </Box>
                      </Box>
                    </Form.Field>
                  </Box>
                  <Flex justify="between">
                    <Text>$ {m.quantity * m.unitPrice}</Text>
                    <Box
                      className="flex items-center rounded-full bg-red-400 p-2 cursor-pointer"
                      onClick={() => {
                        setMaterials(
                          materials.filter((field) => {
                            return field.id !== m.id;
                          })
                        );
                      }}
                    >
                      <TrashIcon color="white" />
                    </Box>
                  </Flex>
                </Grid>
              );
            })}
          </Box>
          {/* Tabla de materiales */}

          {/* PIE DE TABLA */}
          <Flex className="p-2 " justify="between">
            <Flex
              gap="4"
              direction={{
                initial: 'column',
                xs: 'column',
                sm: 'column',
                md: 'column',
                lg: 'row',
                xl: 'row',
              }}
            >
              <Text className="font-bold underline">SOLICITADO POR EL Sr:</Text>
              <FormField
                valueMissing="Campo requerido"
                value={requestedBy}
                setValue={setRequestedBy}
                typeMismatch="Nombre inválida"
                type="text"
                name="requestedBy"
                required
              />
            </Flex>
            <Flex direction="column">
              <Flex gap="6" className="border border-black">
                <Flex grow="1">
                  <Text>TOTAL</Text>
                </Flex>
                <Flex grow="1" justify="end">
                  <Text>$ {netTotal}</Text>
                </Flex>
              </Flex>
              <Flex gap="6" className="border border-black" align="center">
                <Flex grow="1">
                  <Text>DESCTO.</Text>
                </Flex>
                <Flex grow="1" justify="end" className="w-20">
                  <Form.Field className="rounded-md" name="discount">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                      }}
                    ></div>
                    <Form.Control asChild>
                      <input
                        className="input input-bordered w-full bg-transparent"
                        type="number"
                        required
                        onChange={(e) => {
                          const inputValue = e.target.value || '';
                          if (
                            inputValue === '0' ||
                            (!isNaN(Number(inputValue)) && inputValue !== '')
                          ) {
                            setDiscount(
                              inputValue === '0'
                                ? '0'
                                : String(Number(inputValue))
                            );
                          } else {
                            setDiscount('0');
                          }
                        }}
                        value={discount}
                      />
                    </Form.Control>
                  </Form.Field>
                </Flex>
                %
              </Flex>
              <Flex gap="6" className="border border-black">
                <Flex grow="1">
                  <Text>TOTAL NETO</Text>
                </Flex>
                <Flex grow="1" justify="end">
                  <Text>
                    $ {netTotal - netTotal * (parseInt(discount) / 100)}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap="6" className="border border-black">
                <Flex grow="1">
                  <Text>IVA 19%</Text>
                </Flex>
                <Flex grow="1" justify="end">
                  <Text>
                    ${' '}
                    {(netTotal - netTotal * (parseInt(discount) / 100)) * 0.19}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap="6" className="border border-black p-2">
                <Flex grow="1">
                  <Text className="font-bold">TOTAL</Text>
                </Flex>
                <Flex grow="1" justify="end">
                  <Text>
                    ${' '}
                    {(
                      netTotal -
                      netTotal * (parseInt(discount) / 100) +
                      (netTotal - netTotal * (parseInt(discount) / 100)) * 0.19
                    ).toFixed(4)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {/* PIE DE TABLA */}

          {/* Disclaimer  */}
          <Flex className="p-5">
            <Box>
              <Text className="font-bold">
                AL FACTURAR NO OLVIDE HACER REFERENCIA AL NÚMERO DE ORDEN DE
                COMPRA, PARA UNA CANCELACIÓN MAS EXPEDITA.
              </Text>
            </Box>
          </Flex>
          {/* Disclaimer  */}

          {/* Informacion sobre donde facturar    */}
          <Flex direction="column">
            <Flex>
              <Flex className="w-1/3 mb-3">
                <Text className="font-bold underline">FACTURAR A :</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="w-1/3">
                <Text className="font-bold">RAZÓN SOCIAL</Text>
              </Flex>
              <Flex grow="1">
                <Text>MAESTRANZA BACIAN Y ROCHA LTDA.</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="w-1/3">
                <Text className="font-bold">RUT</Text>
              </Flex>
              <Flex grow="1">
                <Text>79.863.750-9</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="w-1/3">
                <Text className="font-bold">DIRECCIÓN</Text>
              </Flex>
              <Flex grow="1">
                <Text>AV. LAS PARCELAS MANZANA "D" SITIO 7 ALTO HOSPICIO</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex className="w-1/3">
                <Text className="font-bold">GIRO</Text>
              </Flex>
              <Flex grow="1">
                <Text>MAESTRANZA</Text>
              </Flex>
            </Flex>
          </Flex>
          {/* Informacion sobre donde facturar    */}

          {/* Informacion sobre soliciud y aprobacion */}
          <Grid columns="3" className="mt-5" justify="center">
            <Flex
              className="border border-black"
              justify="center"
              direction="column"
            >
              <Text className="font-bold text-center">SOLICITADO POR</Text>
              <Text className="capitalize text-center">{requestedBy}</Text>
            </Flex>
            <Flex
              className="border border-black"
              justify="center"
              direction="column"
            >
              <Text className="font-bold text-center">EMITIDO POR</Text>
              <FormField
                valueMissing="Campo requerido"
                value={emittedBy}
                setValue={setEmittedBy}
                typeMismatch="Nombre inválida"
                type="text"
                name="emittedBy"
                required
              />
            </Flex>
            <Flex
              className="border border-black"
              justify="center"
              direction="column"
            >
              <Text className="font-bold text-center">AUTORIZADO POR</Text>
              <FormField
                valueMissing="Campo requerido"
                value={approvedBy}
                setValue={setApprovedBy}
                typeMismatch="Nombre inválida"
                type="text"
                name="approvedBy"
                required
              />
            </Flex>
          </Grid>
          {/* Informacion sobre soliciud y aprobacion */}

          {/* Email de contactos */}
          <Flex className="justify-evenly mt-5" gap="9">
            <Flex direction="column" justify="center" align="center">
              <Text className="font-bold">Bacianproduccion@gmail.com</Text>
              <Text>57/ 254 2883</Text>
            </Flex>
            <Flex direction="column" justify="center" align="center">
              <Text className="font-bold">mbacian@bacianyrocha.cl</Text>
              <Text>57/ 542883</Text>
            </Flex>
          </Flex>

          {/* Pie de documento con sello */}
          <Flex className="mt-40 relative" direction="column">
            <Box height="4" width={'100%'} className="bg-yellow-300"></Box>
            <Box
              height="6"
              width={'100%'}
              className="bg-gradient-to-b from-blue-500"
            ></Box>
            <Image
              src={qualitySeal}
              alt="quality"
              className="self-end absolute bottom-1"
              height={100}
              width={100}
            />
          </Flex>
        </Box>
      </Box>
    </Form.Root>
  );
};

export default SaleOrderForm;
