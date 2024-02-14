'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  IconButton,
  Select,
  Separator,
  Table,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import logo from '../../../public/assets/images/byrs.png';
import { SaleOrder, WorkOrder, WorkOrderMaterial } from '@prisma/client';
import FormField from '../components/form/FormField';
import * as Form from '@radix-ui/react-form';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import axios from 'axios';
import AutoCompleteSelect from '../components/AutoCompleteSelect';
import { sign } from 'crypto';

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

  const [materials, setMaterials] = useState<Material[]>([]);

  const [materialsToSubmit, setMaterialsToSubmit] = useState<Material[]>();

  const [showMaterialForm, setMaterialForm] = useState(false);
  const [saleOrderForm, setSaleOrderForm] = useState(false);
  const [receiptForm, setReceiptForm] = useState(false);
  const [selectedSaleOrder, setSelectedSaleOrder] = useState('');

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
                setMaterialForm(true);
                setTimeout(() => {
                  window.scrollTo({ top: 1000, behavior: 'smooth' });
                }, 200);
              }}
            >
              <PlusIcon />
              Agregar materiales
            </Button>
          </Flex>
          <Box className="border border-zinc-200 rounded-lg mt-5">
            {showMaterialForm && (
              <Grid
                className="p-5 "
                columns={{
                  initial: '1',
                  xs: '1',
                  sm: '1',
                  md: '1',
                  lg: '2',
                  xl: '2',
                }}
              >
                <Flex direction="column" gap="3" justify="center">
                  <Box>
                    <Text className="text-slate-500">Tipo de compra</Text>
                  </Box>
                  <Box>
                    <Select.Root
                      size="3"
                      defaultValue="none"
                      onValueChange={(value) => {
                        if (value === 'saleorder') {
                          setReceiptForm(false);
                          setSaleOrderForm(true);
                        } else {
                          setSaleOrderForm(false);
                          setReceiptForm(true);
                        }
                        setTimeout(() => {
                          window.scrollTo({ top: 1000, behavior: 'smooth' });
                        }, 200);
                      }}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Item value="none" disabled>
                          <Text className="text-slate-500">Elegir...</Text>
                        </Select.Item>
                        <Select.Item value="saleorder">
                          Orden de Compra
                        </Select.Item>
                        <Select.Item value="receipt">Boleta</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Box>
                </Flex>
              </Grid>
            )}
            {saleOrderForm && (
              <Flex direction="column" className="p-5 " gap="4">
                <Flex
                  direction="column"
                  gap="3"
                  className="border border-zinc-200 p-3 rounded-lg"
                >
                  <Box>
                    <Text className="text-slate-500">N° O. de compra</Text>
                  </Box>
                  <Box>
                    <AutoCompleteSelect
                      items={saleOrders}
                      dataKey={'number'}
                      dataToRetrieve="id"
                      getValue={setSelectedSaleOrder}
                    />
                  </Box>
                </Flex>

                {selectedSaleOrder && (
                  <Grid
                    className="border border-zinc-200 rounded-lg p-3"
                    justify="center"
                    align="center"
                    gap="2"
                  >
                    <Text className="text-zinc-500">Selecciona materiales</Text>
                    {saleOrders
                      .filter((so) => so.id == selectedSaleOrder)
                      .map((so) =>
                        so.materials.map((m, index) => {
                          return (
                            <Text as="label" key={m.id}>
                              <Flex align="center" gap="2">
                                <Checkbox
                                  defaultChecked={materialsToSubmit?.some(
                                    (material) => material.id === m.id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      const updatedMaterials = [
                                        ...materials,
                                        {
                                          id: m.id,
                                          name: m.name,
                                          unitPrice: m.unitPrice,
                                          quantity: m.quantity,
                                          code: m.code,
                                          discount: so.discount,
                                          saleOrderId: so.number,
                                        },
                                      ];
                                      setMaterials(updatedMaterials);
                                    } else {
                                      const updatedMaterials = materials.filter(
                                        (material) => {
                                          return material.id != m.id;
                                        }
                                      );
                                      setMaterials(updatedMaterials);
                                    }
                                  }}
                                />{' '}
                                {m.name}
                              </Flex>
                            </Text>
                          );
                        })
                      )}
                  </Grid>
                )}
                <Flex className="col-span-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMaterialsToSubmit(materials);
                    }}
                    className="w-full"
                  >
                    Agregar{' '}
                  </Button>
                </Flex>
              </Flex>
              // aca
            )}
          </Box>
          <Grid columns="7" className="mt-5 p-2 bg-[#013564]">
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">Material</Text>
            </Box>
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">Codigo</Text>
            </Box>
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">Cantidad</Text>
            </Box>
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">P. Unitario</Text>
            </Box>
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">Descuento</Text>
            </Box>
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">N° o. Compra</Text>
            </Box>
            <Box className="flex justify-center">
              <Text className="font-bold text-slate-100">Total</Text>
            </Box>
          </Grid>
          <Flex direction="column" gap="4">
            {materialsToSubmit?.map((m, index) => {
              return (
                <>
                  <Grid key={m.id} columns="7" className="mt-3">
                    <Box className="flex justify-center">
                      <Text>{m.name}</Text>
                    </Box>
                    <Box className="flex justify-center">
                      <Text>{m.code}</Text>
                    </Box>
                    <Box className="flex justify-center">
                      <IconButton
                        size="1"
                        color="gray"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const updatedMaterials = [...materialsToSubmit];
                          updatedMaterials[index].quantity = m.quantity - 1;
                          setMaterialsToSubmit(updatedMaterials);
                        }}
                      >
                        <MinusIcon />
                      </IconButton>
                      <input
                        value={m.quantity}
                        onChange={(e) => {
                          const updatedMaterials = [...materialsToSubmit];
                          updatedMaterials[index].quantity =
                            e.target.value === '' ? 0 : Number(e.target.value); //arreglar los ceros de la izquierda
                          setMaterialsToSubmit(updatedMaterials);
                        }}
                        type="number"
                        className="text-center w-[90%]"
                      />
                      <IconButton
                        size="1"
                        color="gray"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const updatedMaterials = [...materialsToSubmit];
                          updatedMaterials[index].quantity = m.quantity + 1;
                          setMaterialsToSubmit(updatedMaterials);
                        }}
                      >
                        <PlusIcon />
                      </IconButton>
                    </Box>
                    <Box className="flex justify-center">
                      <Text>{m.unitPrice}</Text>
                    </Box>
                    <Box className="flex justify-center">
                      <Text>{m.discount} %</Text>
                    </Box>
                    <Box className="flex justify-center">
                      <Text>{m.saleOrderId}</Text>
                    </Box>
                    <Box className="flex justify-center items-center gap-3">
                      <Text>
                        $
                        {m.quantity * m.unitPrice -
                          m.quantity * m.unitPrice * (m.discount / 100)}
                      </Text>
                      <Box
                        className="rounded-full bg-red-400 p-2 text-slate-100 cursor-pointer hover:scale-110 transition-all"
                        onClick={() => {
                          const updatedMaterials = materialsToSubmit.filter(
                            (sm) => sm.id !== m.id
                          );
                          setMaterialsToSubmit(updatedMaterials);
                        }}
                      >
                        <TrashIcon />
                      </Box>
                    </Box>
                  </Grid>
                  <Separator size="4" />
                </>
              );
            })}
          </Flex>
          {/* Materiales      */}
        </Box>
      </Form.Root>
    </>
  );
};

export default WorkOrderForm;
