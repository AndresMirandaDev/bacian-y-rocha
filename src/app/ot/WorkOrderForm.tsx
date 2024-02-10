'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Select, Table, Text } from '@radix-ui/themes';
import Image from 'next/image';
import logo from '../../../public/assets/images/byrs.png';
import { SaleOrder, WorkOrder, WorkOrderMaterial } from '@prisma/client';
import FormField from '../components/form/FormField';
import * as Form from '@radix-ui/react-form';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';

interface Props {
  workOrder?: WorkOrder;
  saleOrders: SaleOrder[];
}

type Material = {
  name: string;
  unitPrice: number;
  quantity: number;
  code: string;
  id: string;
  discount: number;
  saleOrderId: string;
  options?: {
    name: string;
    unitPrice: number;
    quantity: number;
    code: string;
    id: string;
    discount: number;
    saleOrderId: string;
  }[];
};

const WorkOrderForm = ({ workOrder, saleOrders }: Props) => {
  const [revision, setRevision] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [quoteNumber, setQuoteNumber] = useState('');
  const [requiresPlaque, setRequiresPlaque] = useState('');
  const [componentName, setComponentName] = useState('');
  const [componentDevice, setComponentDevice] = useState('');
  const [model, setModel] = useState('');
  const [deviceNumber, setDeviceNumber] = useState('');
  const [materialsToSend, setMaterialsToSend] = useState([
    {
      name: '',
      unitPrice: 0,
      quantity: 0,
      code: '',
      id: '1',
      discount: 0,
      saleOrderId: '',
    },
  ]);
  const [materials, setMaterials] = useState<Material[]>([
    {
      name: '',
      unitPrice: 0,
      quantity: 0,
      code: '',
      id: '1',
      discount: 0,
      saleOrderId: '',
      options: [
        {
          name: 'Material',
          unitPrice: 0,
          quantity: 0,
          code: '',
          id: 'placeholder',
          discount: 0,
          saleOrderId: '',
        },
      ],
    },
  ]);

  useEffect(() => {
    if (workOrder) {
      setRevision(workOrder.revision);
      setCode(workOrder.code);
      setNumber(workOrder.number);
      setDescription(workOrder.description);
      setClient(workOrder.client);
      setStartDate(workOrder.startDate.toLocaleDateString());
      setEndDate(workOrder.endDate.toLocaleDateString());
      setEstimatedDate(workOrder.estimatedDate.toLocaleDateString());
      setQuoteNumber(workOrder.quoteNumber);
      setRequiresPlaque(workOrder.requiresPlaque);
      setComponentName(workOrder.componentName);
      setComponentDevice(workOrder.componentDevice);
      setModel(workOrder.model);
      setDeviceNumber(workOrder.deviceNumber);
      setMaterials(workOrder.materials);
    }
  }, [workOrder]);

  const handleAddRow = () => {
    setMaterials([
      ...materials,
      {
        name: '',
        unitPrice: 0,
        quantity: 0,
        code: '',
        id: (Math.random() * 1000).toString(),
        discount: 0,
        saleOrderId: '',
        options: [
          {
            name: 'Material',
            unitPrice: 0,
            quantity: 0,
            code: '',
            id: (Math.random() * 1000).toString(),
            discount: 0,
            saleOrderId: '',
          },
        ],
      },
    ]);
  };

  return (
    <>
      <Form.Root>
        <Box className="bg-white rounded-md p-5">
          {/* cabecera  */}
          <Flex
            className="border border-slate-300 rounded-md"
            gap="4"
            direction={{
              initial: 'column',
              xs: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
          >
            <Box>
              <Image src={logo} width={200} height={200} alt="logo" />
            </Box>
            <Flex
              direction="column"
              justify="center"
              className="bg-[#013564] p-3"
              align={{
                initial: 'start',
                xs: 'start',
                sm: 'start',
                md: 'start',
                lg: 'center',
                xl: 'center',
              }}
            >
              <Box>
                <Text className="text-slate-100 font-bold">
                  INFORME TÉCNICO
                </Text>
              </Box>
              <Box>
                <Text className="text-slate-100 font-bold">
                  REPARACIONES ESTRUCTURALES DE COMPONENTES
                </Text>
              </Box>
              <Box>
                <Text className="text-slate-100 font-bold">
                  INDUSTRIALES Y MINEROS
                </Text>
              </Box>
            </Flex>
            <Grid columns="2" className="flex-grow">
              <Box className="border border-slate-300 flex justify-center items-center font-bold">
                <Text>Revisión</Text>
              </Box>
              <Box className="border border-slate-300 flex justify-center items-center">
                <FormField
                  value={revision}
                  setValue={setRevision}
                  valueMissing="Campo requerido"
                  name="revision"
                  typeMismatch="revision invalida"
                />
              </Box>
              <Box className="border border-slate-300 flex justify-center items-center font-bold">
                <Text>Código</Text>
              </Box>
              <Box className="border border-slate-300 flex justify-center items-center">
                <FormField
                  value={code}
                  setValue={setCode}
                  valueMissing="Campo requerido"
                  name="code"
                  typeMismatch="código invalido"
                />
              </Box>
            </Grid>
          </Flex>
          {/* cabecera  */}

          {/* datos de orden de trabajo */}
          <Flex
            className="border border-slate-500 mt-10 p-3"
            direction={{
              initial: 'column',
              xs: 'column',
              sm: 'column',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
          >
            <Flex className="flex-grow" direction="column">
              <Box>
                <Text className="font-bold">Orden de trabajo N°</Text>
              </Box>
              <Box>
                <FormField
                  value={number}
                  setValue={setNumber}
                  valueMissing="Campo requerido"
                  name="number"
                  typeMismatch="numero inválido"
                />
              </Box>
            </Flex>
            <Flex direction="column" className="flex-grow">
              <Box>
                <Text className="font-bold">Asunto:</Text>
              </Box>
              <Box>
                <FormField
                  value={description}
                  setValue={setDescription}
                  valueMissing="Campo requerido"
                  name="description"
                  typeMismatch="descripción invalida"
                />
              </Box>
            </Flex>
          </Flex>
          {/* datos de orden de trabajo */}

          {/* Datos generales */}

          <Flex direction="column">
            <Box className="bg-[#013564] w-full p-1 mt-10">
              <Text className="text-slate-100 font-bold">
                1. DATOS GENERALES
              </Text>
            </Box>
            <Grid
              columns={{
                initial: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '2',
                xl: '2',
              }}
              className="p-1"
              gap={{
                initial: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '0',
                xl: '0',
              }}
            >
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Cliente</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={client}
                    setValue={setClient}
                    valueMissing="Campo requerido"
                    name="client"
                    typeMismatch="cliente invalido"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Fecha inicio</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={startDate}
                    setValue={setStartDate}
                    valueMissing="Campo requerido"
                    name="startDate"
                    typeMismatch="fecha invalida"
                    type="date"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">N° cotización</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={quoteNumber}
                    setValue={setQuoteNumber}
                    valueMissing="Campo requerido"
                    name="quoteNumber"
                    typeMismatch="numero invalido"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Fecha estimada de entrega</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={estimatedDate}
                    setValue={setEstimatedDate}
                    valueMissing="Campo requerido"
                    name="estimatedDate"
                    typeMismatch="fecha invalida"
                    type="date"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Requiere placa</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={requiresPlaque}
                    setValue={setRequiresPlaque}
                    valueMissing="Campo requerido"
                    name="requiresPlaque"
                    typeMismatch="campo invalido"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Fecha Entrega</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={endDate}
                    setValue={setEndDate}
                    valueMissing="Campo requerido"
                    name="endDate"
                    typeMismatch="fecha invalida"
                    type="date"
                  />
                </Box>
              </Flex>
            </Grid>
          </Flex>

          {/* Datos generales */}

          {/* Datos de componente */}
          <Flex direction="column">
            <Box className="bg-[#013564] w-full p-1 mt-10">
              <Text className="text-slate-100 font-bold">
                2. DATOS DE COMPONENTE
              </Text>
            </Box>
            <Grid
              columns={{
                initial: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '2',
                xl: '2',
              }}
              className="p-1"
              gap={{
                initial: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '0',
                xl: '0',
              }}
            >
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Componente</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={componentName}
                    setValue={setComponentName}
                    valueMissing="Campo requerido"
                    name="componentName"
                    typeMismatch="campo invalido"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Modelo</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={model}
                    setValue={setModel}
                    valueMissing="Campo requerido"
                    name="model"
                    typeMismatch="campo invalido"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">Equipo</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={componentDevice}
                    setValue={setComponentDevice}
                    valueMissing="Campo requerido"
                    name="componentDevice"
                    typeMismatch="campo invalido"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box className="w-1/2">
                  <Text className="font-bold">N° de parte</Text>
                </Box>
                <Box className="w-1/2">
                  <FormField
                    value={deviceNumber}
                    setValue={setDeviceNumber}
                    valueMissing="Campo requerido"
                    name="deviceNumber"
                    typeMismatch="campo invalido"
                  />
                </Box>
              </Flex>
            </Grid>
          </Flex>
          {/* Datos de componente */}
          {/* Materiales      */}
          <Flex direction="column">
            <Box className="bg-[#013564] w-full p-1 mt-10">
              <Text className="text-slate-100 font-bold">
                3. MATERIALES A UTILIZAR O COMPRAR/ REPUESTOS
              </Text>
            </Box>
          </Flex>
          <Flex className="mt-3">
            <Button
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddRow();
              }}
            >
              <PlusIcon />
              Agregar material
            </Button>
          </Flex>
          <Grid
            columns="6"
            display={{
              initial: 'none',
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'grid',
              xl: 'grid',
            }}
            className="mt-5 border-b-2"
          >
            <Box>
              <Text className="font-bold">ORDEN DE COMPRA</Text>
            </Box>
            <Box>
              <Text className="font-bold">MATERIAL</Text>
            </Box>
            <Box>
              <Text className="font-bold">CANTIDAD</Text>
            </Box>
            <Box>
              <Text className="font-bold">VALOR UNIT.</Text>
            </Box>
            <Box>
              <Text className="font-bold">DESCUENTO</Text>
            </Box>
            <Box>
              <Text className="font-bold">VALOR TOTAL</Text>
            </Box>
          </Grid>
          <Flex direction="column">
            {materials.map((m, index) => {
              return (
                <Grid
                  columns={{
                    initial: '1',
                    xs: '1',
                    sm: '1',
                    md: '1',
                    lg: '6',
                    xl: '6',
                  }}
                  align="center"
                  key={m.id}
                  className="border-b-2 border-slate-300 rounded-md p-2 mt-5"
                >
                  <Box>
                    <Form.Field name="description">
                      <Box className="flex items-center mt-3">
                        <Box className="flex items-baseline justify-between flex-col">
                          <Box
                            display={{
                              initial: 'block',
                              xs: 'block',
                              sm: 'block',
                              md: 'block',
                              lg: 'none',
                              xl: 'none',
                            }}
                          >
                            <Text className="font-bold">
                              Numero de orden de compra
                            </Text>
                          </Box>
                          <Form.Control asChild>
                            <Select.Root
                              size="3"
                              onValueChange={async (e) => {
                                const saleOrderSelected = (
                                  await axios.get(`/api/saleorders/${e}`)
                                ).data.body;

                                const NewMaterials = (
                                  await axios.get(`/api/saleorders/${e}`)
                                ).data.body.materials;

                                const updatedMaterialsToSend = [
                                  ...materialsToSend,
                                ];

                                updatedMaterialsToSend[index].discount =
                                  saleOrderSelected.discount;
                                updatedMaterialsToSend[index].saleOrderId =
                                  saleOrderSelected.id;

                                const updatedMaterials = [...materials];
                                updatedMaterials[index].options = [
                                  ...NewMaterials,
                                ];
                                setMaterials(updatedMaterials);
                                setMaterialsToSend(updatedMaterialsToSend);
                              }}
                            >
                              <Select.Trigger />
                              <Select.Content>
                                <Select.Item value="none" disabled>
                                  <Text className="text-slate-400">
                                    Orden de Compra
                                  </Text>
                                </Select.Item>
                                {saleOrders.map((so) => {
                                  return (
                                    <Select.Item key={so.id} value={so.id}>
                                      {so.number}
                                    </Select.Item>
                                  );
                                })}
                              </Select.Content>
                            </Select.Root>
                          </Form.Control>
                        </Box>
                      </Box>
                    </Form.Field>
                  </Box>
                  <Box>
                    <Form.Field name="description">
                      <Box className="flex items-center mt-3">
                        <Box className="flex items-baseline justify-between flex-col ">
                          <Box
                            display={{
                              initial: 'block',
                              xs: 'block',
                              sm: 'block',
                              md: 'block',
                              lg: 'none',
                              xl: 'none',
                            }}
                          >
                            <Text className="font-bold">Material</Text>
                          </Box>
                          <Form.Control asChild>
                            <Select.Root
                              defaultValue="none"
                              size="3"
                              onValueChange={(e) => {
                                const selectedMaterial = m.options!.filter(
                                  (o) => o.id === e
                                );
                                const updatedMaterials = [...materials];
                                const updatedMaterialsToSend = [
                                  ...materialsToSend,
                                ];

                                updatedMaterialsToSend[index].quantity =
                                  selectedMaterial[0].quantity;
                                updatedMaterialsToSend[index].unitPrice =
                                  selectedMaterial[0].unitPrice;
                                updatedMaterialsToSend[index].name =
                                  selectedMaterial[0].name;
                                updatedMaterialsToSend[index].code =
                                  selectedMaterial[0].code;

                                updatedMaterials[index].quantity =
                                  selectedMaterial[0].quantity;
                                updatedMaterials[index].unitPrice =
                                  selectedMaterial[0].unitPrice;

                                setMaterials(updatedMaterials);
                                setMaterialsToSend(updatedMaterialsToSend);
                              }}
                            >
                              <Select.Trigger />
                              <Select.Content>
                                <Select.Item value="none" disabled>
                                  <Text className="text-slate-400">
                                    Material
                                  </Text>
                                </Select.Item>
                                {m.options?.map((o) => {
                                  if (o.id !== 'placeholder')
                                    return (
                                      <Select.Item value={o.id} key={o.id}>
                                        {o.name}
                                      </Select.Item>
                                    );
                                })}
                              </Select.Content>
                            </Select.Root>
                          </Form.Control>
                        </Box>
                      </Box>
                    </Form.Field>
                  </Box>
                  <Box>
                    <Box className="flex items-baseline justify-between flex-col flex-grow">
                      <Box
                        display={{
                          initial: 'block',
                          xs: 'block',
                          sm: 'block',
                          md: 'block',
                          lg: 'none',
                          xl: 'none',
                        }}
                      >
                        <Text className="font-bold">Cantidad</Text>
                      </Box>
                      <Text>{m.quantity}</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      display={{
                        initial: 'block',
                        xs: 'block',
                        sm: 'block',
                        md: 'block',
                        lg: 'none',
                        xl: 'none',
                      }}
                    >
                      <Text className="font-bold">Valor unitario</Text>
                    </Box>
                    <Box className="flex items-baseline justify-between flex-col flex-grow">
                      <Text>${m.unitPrice}</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      display={{
                        initial: 'block',
                        xs: 'block',
                        sm: 'block',
                        md: 'block',
                        lg: 'none',
                        xl: 'none',
                      }}
                    >
                      <Text className="font-bold">Descuento</Text>
                    </Box>
                    <Box className="flex items-baseline justify-between flex-col flex-grow">
                      <Text>{m.discount}%</Text>
                    </Box>
                  </Box>
                  <Flex justify="between">
                    <Box>
                      <Box
                        display={{
                          initial: 'block',
                          xs: 'block',
                          sm: 'block',
                          md: 'block',
                          lg: 'none',
                          xl: 'none',
                        }}
                      >
                        <Text className="font-bold">Total</Text>
                      </Box>
                      <Text>$ {m.quantity * m.unitPrice}</Text>
                    </Box>
                    <Box
                      className="flex items-center justify-center rounded-full bg-red-400 p-2 cursor-pointer w-20"
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
            <Flex gap="4" justify="end" className="mr-20">
              <Box>
                <Text className="text-xl font-bold">TOTAL</Text>
              </Box>
              <Box>
                <Text className="text-xl">
                  $
                  {materials.reduce((accumulator, m) => {
                    return (
                      m.quantity * m.unitPrice -
                      m.quantity * m.unitPrice * (m.discount / 100) +
                      accumulator
                    );
                  }, 0)}
                </Text>
              </Box>
            </Flex>
          </Flex>
          {/* Materiales      */}
        </Box>
      </Form.Root>
    </>
  );
};

export default WorkOrderForm;
