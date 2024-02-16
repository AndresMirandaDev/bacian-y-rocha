'use client';
import { SaleOrder, WorkOrder } from '@prisma/client';
import * as Form from '@radix-ui/react-form';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  UpdateIcon,
} from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  IconButton,
  Select,
  Separator,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../public/assets/images/byrs.png';
import AutoCompleteSelect from '../components/AutoCompleteSelect';
import FormField from '../components/form/FormField';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { formatDate } from '../helpers/formatDate';
import { string } from 'zod';
import ActivityForm from './ActivityForm';

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
};

interface SubTask {
  id: string;
  description: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
}

interface Task {
  id: string;
  description: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
  subTasks?: SubTask[];
}

const WorkOrderForm = ({ workOrder, saleOrders }: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

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
  const [activities, setActivities] = useState<Task[]>([]);

  const [materials, setMaterials] = useState<Material[]>([]);

  const [materialsToSubmit, setMaterialsToSubmit] = useState<Material[]>([]);

  const [showMaterialForm, setMaterialForm] = useState(false);
  const [saleOrderForm, setSaleOrderForm] = useState(false);
  const [receiptForm, setReceiptForm] = useState(false);
  const [selectedSaleOrder, setSelectedSaleOrder] = useState('');

  //new material
  const [name, setName] = useState('');
  const [unitPrice, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [materialCode, setMaterialCode] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    if (workOrder) {
      setRevision(workOrder.revision);
      setCode(workOrder.code);
      setNumber(workOrder.number);
      setDescription(workOrder.description);
      setClient(workOrder.client);
      setStartDate(formatDate(workOrder.startDate.toLocaleDateString()));
      setEstimatedDate(
        formatDate(workOrder.estimatedDate.toLocaleDateString())
      );
      setQuoteNumber(workOrder.quoteNumber);
      setRequiresPlaque(workOrder.requiresPlaque);
      setComponentName(workOrder.componentName);
      setComponentDevice(workOrder.componentDevice);
      setModel(workOrder.model);
      setDeviceNumber(workOrder.deviceNumber);
      setMaterialsToSubmit(workOrder.materials);
      if (workOrder.endDate) {
        setEndDate(formatDate(workOrder.endDate.toLocaleDateString()));
      }
      setActivities(workOrder.activities);
    }
  }, [workOrder]);

  const onSubmitReceiptMaterial = () => {
    setMaterialsToSubmit([
      ...materialsToSubmit,
      {
        name,
        unitPrice: parseInt(unitPrice),
        quantity: parseInt(quantity),
        code: materialCode,
        id: (Math.random() * 1000).toString(),
        discount: parseInt(discount),
        saleOrderId: 'boleta',
      },
    ]);

    setName('');
    setDiscount('');
    setMaterialCode('');
    setQuantity('');
    setPrice('');
    toast.success('Material ha sido agregado.');
  };
  const submitWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (workOrder) {
        setSubmitting(true);
        const updatedData: {
          revision: string;
          code: string;
          number: string;
          description: string;
          client: string;
          quoteNumber: string;
          requiresPlaque: string;
          startDate: string;
          endDate?: string;
          estimatedDate: string;
          componentDevice: string;
          deviceNumber: string;
          model: string;
          componentName: string;
          materials: Material[];
          activities: Task[];
        } = {
          revision,
          code,
          number,
          description,
          client,
          quoteNumber,
          requiresPlaque,
          startDate: new Date(startDate).toISOString(),
          estimatedDate: new Date(estimatedDate).toISOString(),
          componentDevice,
          deviceNumber,
          model,
          componentName,
          materials: materialsToSubmit,
          activities,
        };
        if (endDate !== '') {
          updatedData.endDate = new Date(endDate).toISOString();
        }

        await axios.patch(`/api/workorders/${workOrder.id}`, updatedData);
        toast.success('Orden de trabajo actualizada.');
        router.push('/ot');
        setSubmitting(false);
        router.refresh();
      } else {
        setSubmitting(true);
        await axios.post('/api/workorders', {
          revision,
          code,
          number,
          description,
          client,
          quoteNumber,
          requiresPlaque,
          startDate: new Date(startDate).toISOString(),
          estimatedDate: new Date(estimatedDate).toISOString(),
          componentDevice,
          deviceNumber,
          model,
          componentName,
          materials: materialsToSubmit,
          activities,
        });
        toast.success('Orden de trabajo registrada.');
        router.push('/ot');
        setSubmitting(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error(
        'Orden de trabajo no pudo ser registrada, inténtelo nuevamente.'
      );
    }
  };

  return (
    <>
      <Form.Root onSubmit={submitWorkOrder}>
        <Form.Submit asChild>
          <Box className="p-3">
            <Button
              disabled={submitting}
              style={{ backgroundColor: workOrder ? '#2ebb45' : '#3E63DD' }}
            >
              {!workOrder && <PlusIcon />}
              {workOrder && <UpdateIcon />}
              {workOrder && 'Actualizar Orden de trabajo'}
              {!workOrder && 'Registrar Orden de trabajo'}
            </Button>
          </Box>
        </Form.Submit>
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
            gap="3"
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
                lg: '2',
                xl: '2',
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
                    required={false}
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
                lg: '2',
                xl: '2',
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
                if (!showMaterialForm) {
                  setMaterialForm(true);
                } else if (showMaterialForm) {
                  setMaterialForm(false);
                  setSaleOrderForm(false);
                  setReceiptForm(false);
                }
                setTimeout(() => {
                  window.scrollTo({ top: 1000, behavior: 'smooth' });
                }, 200);
              }}
            >
              {!showMaterialForm && <ChevronDownIcon />}
              {showMaterialForm && <ChevronUpIcon />}
              {!showMaterialForm && <Text>Abrir Formulario</Text>}
              {showMaterialForm && <Text>Cerrar Formulario</Text>}
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
            {receiptForm && (
              <Grid
                columns={{
                  initial: '1',
                  xs: '1',
                  sm: '1',
                  md: '1',
                  lg: '2',
                  xl: '2',
                }}
                gap="4"
                className="p-3"
              >
                <Box>
                  <FormField
                    value={name}
                    setValue={setName}
                    valueMissing="Ingresa artículo"
                    typeMismatch="Nombre invalido"
                    label="Artículo"
                    name="name"
                  />
                </Box>
                <Box>
                  <FormField
                    value={materialCode}
                    setValue={setMaterialCode}
                    valueMissing="Ingresa código"
                    typeMismatch="Código invalido"
                    label="Código"
                    name="code"
                  />
                </Box>
                <Box>
                  <FormField
                    value={unitPrice}
                    setValue={setPrice}
                    valueMissing="Ingresa precio"
                    typeMismatch="Precio invalido"
                    label="Precio unitario"
                    name="unitPrice"
                    type="number"
                  />
                </Box>
                <Box>
                  <FormField
                    value={quantity}
                    setValue={setQuantity}
                    valueMissing="Ingresa cantidad"
                    typeMismatch="Cantidad invalida"
                    label="Cantidad"
                    name="quantity"
                    type="number"
                  />
                </Box>
                <Box>
                  <FormField
                    value={discount}
                    setValue={setDiscount}
                    valueMissing="Ingresa descuento"
                    typeMismatch="descuento invalido"
                    label="Descuento"
                    name="discount"
                    type="number"
                  />
                </Box>
                <Box className="flex items-center justify-center">
                  <Button
                    onClick={(e) => {
                      e.preventDefault(), e.stopPropagation();
                      onSubmitReceiptMaterial();
                    }}
                  >
                    Agregar Material
                  </Button>
                </Box>
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
                                        ...materialsToSubmit,
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
                      setMaterialsToSubmit([...materials]);
                    }}
                    className="w-full"
                  >
                    Ingresar{' '}
                  </Button>
                </Flex>
              </Flex>
              // aca
            )}
          </Box>
          <Grid
            columns="7"
            className="mt-5 p-2 bg-[#013564]"
            display={{
              initial: 'none',
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'grid',
              xl: 'grid',
            }}
          >
            <Box className="flex justify-center items-center ">
              <Text className="font-bold text-slate-100">Material</Text>
            </Box>
            <Box className="flex justify-center items-center">
              <Text className="font-bold text-slate-100">Codigo</Text>
            </Box>
            <Box className="flex justify-center items-center">
              <Text className="font-bold text-slate-100">Cantidad</Text>
            </Box>
            <Box className="flex justify-center items-center">
              <Text className="font-bold text-slate-100">P. Unitario</Text>
            </Box>
            <Box className="flex justify-center items-center">
              <Text className="font-bold text-slate-100">Descuento</Text>
            </Box>
            <Box className="flex justify-center items-center">
              <Text className="font-bold text-slate-100 text-center">
                N° o. Compra / Boleta
              </Text>
            </Box>
            <Box className="flex justify-center items-center">
              <Text className="font-bold text-slate-100">Total</Text>
            </Box>
          </Grid>
          <Flex direction="column" gap="4">
            {materialsToSubmit.length === 0 && (
              <Box className="p-3">
                <Text className="text-slate-400 italic">No hay materiales</Text>
              </Box>
            )}
            {materialsToSubmit?.map((m, index) => {
              return (
                <>
                  <Grid
                    key={m.id}
                    columns={{
                      initial: '1',
                      xs: '1',
                      sm: '1',
                      md: '1',
                      lg: '7',
                      xl: '7',
                    }}
                    className="mt-3"
                  >
                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">Material</Text>
                      </Box>
                      <Text>{m.name}</Text>
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
                        <Separator size="4" />
                      </Box>
                    </Flex>
                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">Codigo</Text>
                      </Box>
                      <Text>{m.code}</Text>
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
                        <Separator size="4" />
                      </Box>
                    </Flex>
                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">Cantidad</Text>
                      </Box>
                      <Box className="flex justify-center" items-center>
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
                              e.target.value === ''
                                ? 0
                                : Number(e.target.value); //arreglar los ceros de la izquierda
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
                        <Separator size="4" />
                      </Box>
                    </Flex>

                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">P.unitario</Text>
                      </Box>
                      <Text>${m.unitPrice}</Text>
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
                        <Separator size="4" />
                      </Box>
                    </Flex>
                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">Descuento</Text>
                      </Box>
                      <Text>{m.discount} %</Text>
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
                        <Separator size="4" />
                      </Box>
                    </Flex>
                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">N° O. Compra</Text>
                      </Box>
                      <Text>{m.saleOrderId}</Text>
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
                        <Separator size="4" />
                      </Box>
                    </Flex>
                    <Flex
                      className="flex justify-center items-center"
                      justify={{
                        initial: 'start',
                        xs: 'start',
                        sm: 'start',
                        md: 'start',
                        lg: 'center',
                        xl: 'center',
                      }}
                      direction={{
                        initial: 'column',
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                      }}
                    >
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
                        <Text className="font-bold text-xl">Total</Text>
                      </Box>
                      <Text>
                        $
                        {m.quantity * m.unitPrice -
                          m.quantity * m.unitPrice * (m.discount / 100)}
                      </Text>
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
                        <Separator size="4" />
                      </Box>
                      <Box
                        className="rounded-full bg-red-400 p-2 text-slate-100 cursor-pointer hover:scale-110 transition-all flex justify-center ml-2"
                        onClick={() => {
                          const updatedMaterials = materialsToSubmit.filter(
                            (sm) => sm.id !== m.id
                          );
                          setMaterialsToSubmit(updatedMaterials);
                        }}
                      >
                        <TrashIcon />
                      </Box>
                    </Flex>
                  </Grid>
                  <Separator size="4" />
                </>
              );
            })}
          </Flex>

          {/* Materiales      */}

          {/* actividades */}
          <Flex>
            <Box className="bg-[#013564] w-full p-1 mt-10">
              <Text className="text-slate-100 font-bold">4. Actividades</Text>
            </Box>
          </Flex>
          <Flex>
            <ActivityForm
              sendActivities={setActivities}
              tasks={activities && activities}
            />
          </Flex>
          {/* actividades */}
        </Box>
      </Form.Root>
      <Toaster />
    </>
  );
};

export default WorkOrderForm;
