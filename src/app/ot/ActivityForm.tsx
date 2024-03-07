'use client';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  ScrollArea,
  Select,
  Separator,
  Text,
  TextArea,
} from '@radix-ui/themes';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MdPhotoLibrary, MdSubdirectoryArrowRight } from 'react-icons/md';
import ActivityPopOver from './_components/ActivityPopOver';
import colors from '../styles/colors';
import Link from 'next/link';
import GalleryModal from './_components/GalleryModal';
import ImageUploader from './_components/ImageUploader';
import AutoCompleteSelect from '../components/AutoCompleteSelect';
import { Position } from '@prisma/client';

interface SubTask {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
  hours: number;
  hourPrice: number;
  position: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
  subTasks?: SubTask[];
  photos: string[];
}

interface Props {
  sendActivities: Dispatch<SetStateAction<Task[]>>;
  tasks?: Task[];
  positions: Position[];
}

const ActivityForm = ({ sendActivities, tasks, positions }: Props) => {
  const [activities, setActivities] = useState<Task[]>([
    {
      id: (Math.random() * 1000).toString(),
      name: '',
      description: '',
      assignedTo: '',
      progress: 0,
      startDate: '',
      durationInDays: 0,
      photos: [],
    },
  ]);

  useEffect(() => {
    if (tasks) {
      setActivities(tasks);
    }
  }, [tasks]);

  const handlePositionChange = (
    positionId: string,
    activityIndex: number,
    subTaskIndex: number
  ) => {
    const filteredPosition = positions.filter((p) => p.id === positionId);
    const updatedActivities = [...activities];
    updatedActivities[activityIndex].subTasks![subTaskIndex].position =
      filteredPosition[0].name;
    updatedActivities[activityIndex].subTasks![subTaskIndex].hourPrice =
      filteredPosition[0].value;
    setActivities(updatedActivities);
    sendActivities(updatedActivities);
  };

  const handleChange = (
    e: React.FormEvent,
    index: number,
    field:
      | 'description'
      | 'assignedTo'
      | 'startDate'
      | 'durationInDays'
      | 'name'
      | 'position'
  ) => {
    const updatedData = [...activities];
    updatedData[index] = {
      ...updatedData[index],
      [field]:
        field === 'durationInDays'
          ? Number((e.target as HTMLInputElement).value)
          : (e.target as HTMLInputElement).value,
    };
    setActivities(updatedData);
    sendActivities(updatedData);
  };

  const handleSubTaksChange = (
    e: React.FormEvent,
    taskIndex: number,
    subTaskIndex: number,
    field:
      | 'description'
      | 'assignedTo'
      | 'startDate'
      | 'durationInDays'
      | 'hours'
      | 'hourPrice'
      | 'name'
  ) => {
    const updatedData = [...activities];
    updatedData[taskIndex].subTasks![subTaskIndex] = {
      ...updatedData[taskIndex].subTasks![subTaskIndex],
      [field]:
        field === 'durationInDays' || field === 'hours' || field === 'hourPrice'
          ? Number((e.target as HTMLInputElement).value)
          : (e.target as HTMLInputElement).value,
    };
    setActivities(updatedData);
    sendActivities(updatedData);
  };

  const addRow = () => {
    setActivities([
      ...activities,
      {
        id: (Math.random() * 1000).toString(),
        name: '',
        description: '',
        assignedTo: '',
        progress: 0,
        startDate: '',
        durationInDays: 0,
        photos: [],
      },
    ]);
  };

  const addSubTask = (index: number) => {
    const updatedData = [...activities];
    if (updatedData[index].subTasks) {
      updatedData[index].subTasks = [
        ...updatedData[index].subTasks!,
        {
          id: (Math.random() * 1000).toString(),
          name: '',
          description: '',
          assignedTo: '',
          progress: 0,
          startDate: '',
          durationInDays: 0,
          hours: 0,
          hourPrice: 0,
          position: '',
        },
      ];
    } else {
      updatedData[index].subTasks = [
        {
          id: (Math.random() * 1000).toString(),
          name: '',
          description: '',
          assignedTo: '',
          progress: 0,
          startDate: '',
          durationInDays: 0,
          hours: 0,
          hourPrice: 0,
          position: '',
        },
      ];
    }
    setActivities(updatedData);
    sendActivities(updatedData);
  };

  return (
    <Flex direction="column" className="w-full">
      <Flex className="p-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addRow();
          }}
        >
          <PlusIcon />
          Agregar Actividad
        </Button>
      </Flex>
      <Flex gap="3" direction="column">
        {activities.map((a, index) => {
          return (
            <Grid
              className=" border border-slate-400 overflow-hidden rounded-lg"
              columns={{
                initial: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '1',
                xl: '1',
              }}
              key={a.id}
              gap="2"
              align="center"
            >
              <Flex
                className=" bg-slate-600 p-5 shadow-md shadow-slate-400"
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
                <Flex direction="column">
                  <Box>
                    <Text className="text-slate-100 font-bold">
                      Nombre de actividad
                    </Text>
                  </Box>
                  <input
                    value={a.name}
                    className="border border-slate-300 rounded-md p-2"
                    onChange={(e) => {
                      handleChange(e, index, 'name');
                    }}
                  />
                </Flex>
                <Flex direction="column">
                  <Box>
                    <Text className="text-slate-100 font-bold">Encargado</Text>
                  </Box>
                  <input
                    value={a.assignedTo}
                    className="border border-slate-300 rounded-md p-2"
                    onChange={(e) => {
                      handleChange(e, index, 'assignedTo');
                    }}
                  />
                </Flex>
                <Flex direction="column">
                  <Box>
                    <Text className="text-slate-100 font-bold">
                      Fecha de inicio
                    </Text>
                  </Box>
                  <input
                    value={a.startDate}
                    className="border border-slate-300 rounded-md p-2"
                    onChange={(e) => {
                      handleChange(e, index, 'startDate');
                    }}
                    type="date"
                  />
                </Flex>
                <Flex direction="column">
                  <Box>
                    <Text className="text-slate-100 font-bold">
                      Duración en días
                    </Text>
                  </Box>
                  <input
                    value={a.durationInDays}
                    className="border border-slate-300 rounded-md p-2 text-center"
                    type="number"
                    onChange={(e) => {
                      handleChange(e, index, 'durationInDays');
                    }}
                  />
                </Flex>
                <Flex
                  justify="center"
                  align="center"
                  gap="3"
                  direction="column"
                >
                  <Box>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addSubTask(index);
                      }}
                      style={{ backgroundColor: colors.buttonColors.green }}
                    >
                      <PlusIcon />
                      Agregar sub-tarea
                    </Button>
                  </Box>
                  <Box
                    className="bg-red-400 p-1 rounded-md w-full flex justify-center text-slate-100"
                    onClick={() => {
                      const updatedData = [...activities];
                      const filteredData = updatedData.filter((item) => {
                        return item.id !== a.id;
                      });
                      setActivities(filteredData);
                    }}
                  >
                    Eliminar actividad
                  </Box>
                  <ActivityPopOver>
                    <TextArea
                      value={a.description}
                      placeholder="Agrega una descripción de la actividad..."
                      onChange={(e) => {
                        handleChange(e, index, 'description');
                      }}
                    />
                  </ActivityPopOver>
                </Flex>
              </Flex>
              <Box className="w-full">
                <GalleryModal
                  photos={a.photos}
                  title="Galeria de fotos"
                  description="Registro de fotos de actividad"
                  updateFiles={(file: string) => {
                    const updatedActivities = [...activities];
                    const updatedFiles = a.photos.filter((f) => f !== file);
                    updatedActivities[index].photos = updatedFiles;
                    setActivities(updatedActivities);
                  }}
                  updatable
                />
              </Box>
              <Box className="w-full">
                <ImageUploader
                  setPublicId={(publicId: string) => {
                    const updatedActivities = [...activities];
                    updatedActivities[index].photos = [
                      ...updatedActivities[index].photos,
                      publicId,
                    ];
                    setActivities(updatedActivities);
                  }}
                  multiple
                  allowedFormats={['jpeg', 'jpg', 'png']}
                />
              </Box>

              <Flex direction="column" className="p-1">
                <Flex>
                  <Box className="mt-5 mb-5">
                    <Text className="italic text-slate-800 text-xl font-bold">
                      Sub-tareas
                    </Text>
                  </Box>
                </Flex>
                <Flex direction="column" className="p-3" gap="4">
                  {a.subTasks?.map((st, subTaskIndex) => {
                    return (
                      <ScrollArea className="p-5" key={st.id}>
                        <Grid
                          gap="4"
                          align={{
                            initial: 'stretch',
                            xs: 'stretch',
                            sm: 'stretch',
                            md: 'stretch',
                            lg: 'center',
                            xl: 'center',
                          }}
                          columns={{
                            initial: '1',
                            xs: '1',
                            sm: '1',
                            md: '1',
                            lg: '2',
                            xl: '2',
                          }}
                        >
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">
                                Nombre tarea
                              </Text>
                            </Box>
                            <input
                              value={st.name}
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'name'
                                );
                              }}
                            />
                          </Flex>
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">Encargado</Text>
                            </Box>
                            <input
                              value={st.assignedTo}
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'assignedTo'
                                );
                              }}
                            />
                          </Flex>
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">
                                Fecha de inicio
                              </Text>
                            </Box>
                            <input
                              value={st.startDate}
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'startDate'
                                );
                              }}
                              type="date"
                            />
                          </Flex>
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">
                                Duracion en días
                              </Text>
                            </Box>
                            <input
                              value={st.durationInDays}
                              className="border border-slate-300 rounded-md p-2 text-center"
                              type="number"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'durationInDays'
                                );
                              }}
                            />
                          </Flex>
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">H.H</Text>
                            </Box>
                            <input
                              value={st.hours}
                              className="border border-slate-300 rounded-md p-2 text-center"
                              type="number"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'hours'
                                );
                              }}
                            />
                          </Flex>
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">
                                Cargo/Posición
                              </Text>
                            </Box>
                            <Select.Root
                              size="3"
                              onValueChange={(value) =>
                                handlePositionChange(value, index, subTaskIndex)
                              }
                              defaultValue={
                                positions.filter(
                                  (p) => p.name === st.position
                                )[0].id
                              }
                            >
                              <Select.Trigger />
                              <Select.Content>
                                {positions &&
                                  positions.map((p) => {
                                    return (
                                      <Select.Item key={p.id} value={p.id}>
                                        {p.name}
                                      </Select.Item>
                                    );
                                  })}
                              </Select.Content>
                            </Select.Root>
                          </Flex>
                          <Flex direction="column">
                            <Box>
                              <Text className="text-slate-500">Valor H.H</Text>
                            </Box>
                            <input
                              value={st.hourPrice}
                              className="border border-slate-300 rounded-md p-2 text-center"
                              type="number"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'hourPrice'
                                );
                              }}
                            />
                          </Flex>
                          <Flex
                            direction="column"
                            gap="3"
                            className="col-span-full"
                          >
                            <Box
                              className="p-1 rounded-md items-center flex bg-red-400 text-slate-100 justify-center"
                              onClick={() => {
                                const updatedData = [...activities];
                                updatedData[index].subTasks =
                                  a.subTasks?.filter((t) => t.id !== st.id);

                                setActivities(updatedData);
                                sendActivities(updatedData);
                              }}
                            >
                              Eliminar tarea
                            </Box>
                            <ActivityPopOver>
                              <TextArea
                                placeholder="Agrega una descripción de la tarea..."
                                value={st.description}
                                onChange={(e) => {
                                  handleSubTaksChange(
                                    e,
                                    index,
                                    subTaskIndex,
                                    'description'
                                  );
                                }}
                              />
                            </ActivityPopOver>
                          </Flex>
                        </Grid>
                        <Separator size="4" className="mt-5" />
                      </ScrollArea>
                    );
                  })}
                </Flex>
              </Flex>
            </Grid>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ActivityForm;
