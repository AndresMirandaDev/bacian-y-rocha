'use client';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MdSubdirectoryArrowRight } from 'react-icons/md';

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

interface Props {
  sendActivities: Dispatch<SetStateAction<Task[]>>;
  tasks?: Task[];
}

const ActivityForm = ({ sendActivities, tasks }: Props) => {
  const [activities, setActivities] = useState<Task[]>([
    {
      id: (Math.random() * 1000).toString(),
      description: '',
      assignedTo: '',
      progress: 0,
      startDate: '',
      durationInDays: 0,
    },
  ]);

  useEffect(() => {
    if (tasks) {
      setActivities(tasks);
    }
  }, [tasks]);

  const handleChange = (
    e: React.FormEvent,
    index: number,
    field: 'description' | 'assignedTo' | 'startDate' | 'durationInDays'
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
    field: 'description' | 'assignedTo' | 'startDate' | 'durationInDays'
  ) => {
    const updatedData = [...activities];
    updatedData[taskIndex].subTasks![subTaskIndex] = {
      ...updatedData[taskIndex].subTasks![subTaskIndex],
      [field]:
        field === 'durationInDays'
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
        description: '',
        assignedTo: '',
        progress: 0,
        startDate: '',
        durationInDays: 0,
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
          description: '',
          assignedTo: '',
          progress: 0,
          startDate: '',
          durationInDays: 0,
        },
      ];
    } else {
      updatedData[index].subTasks = [
        {
          id: (Math.random() * 1000).toString(),
          description: '',
          assignedTo: '',
          progress: 0,
          startDate: '',
          durationInDays: 0,
        },
      ];
    }
    setActivities(updatedData);
    sendActivities(updatedData);
  };

  console.log(activities);
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
              className="p-2 border border-slate-300 rounded-lg"
              columns="5"
              key={a.id}
            >
              <Box className="flex justify-center items-center mt-2">
                <Box>
                  <Text className="text-slate-500">Descripción</Text>
                  <textarea
                    value={a.description}
                    className="border border-slate-300 rounded-md p-2"
                    onChange={(e) => {
                      handleChange(e, index, 'description');
                    }}
                  />
                </Box>
              </Box>
              <Box className="flex justify-center items-center">
                <Box>
                  <Text className="text-slate-500">Encargado</Text>
                  <input
                    value={a.assignedTo}
                    className="border border-slate-300 rounded-md p-2"
                    onChange={(e) => {
                      handleChange(e, index, 'assignedTo');
                    }}
                  />
                </Box>
              </Box>
              <Box className="flex justify-center items-center">
                <Box>
                  <Text className="text-slate-500">Fecha de inicio</Text>
                  <input
                    value={a.startDate}
                    className="border border-slate-300 rounded-md p-2"
                    onChange={(e) => {
                      handleChange(e, index, 'startDate');
                    }}
                    type="date"
                  />
                </Box>
              </Box>
              <Box className="flex justify-center items-center">
                <Box>
                  <Text className="text-slate-500">Duración en días</Text>
                  <input
                    value={a.durationInDays}
                    className="border border-slate-300 rounded-md p-2 text-center"
                    type="number"
                    onChange={(e) => {
                      handleChange(e, index, 'durationInDays');
                    }}
                  />
                </Box>
              </Box>
              <Flex justify="center" align="center" gap="3">
                <Box>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addSubTask(index);
                    }}
                  >
                    <PlusIcon />
                    Sub-tarea
                  </Button>
                </Box>
                <Box className="bg-red-400 p-2 rounded-full text-slate-100">
                  <TrashIcon />
                </Box>
              </Flex>

              <Flex direction="column" className="pl-7">
                <Flex>
                  <Box className="mt-5 ">
                    <Text className="italic text-slate-400 text-xl">
                      Sub-tareas
                    </Text>
                  </Box>
                </Flex>
                <Flex direction="column">
                  {a.subTasks?.map((st, subTaskIndex) => {
                    return (
                      <Flex gap="4" align="center" key={st.id}>
                        <Box className="flex items-center">
                          <MdSubdirectoryArrowRight size="20" />
                        </Box>
                        <Box className="flex justify-center items-center mt-2">
                          <Box>
                            <Text className="text-slate-500">Descripción</Text>
                            <textarea
                              value={st.description}
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleSubTaksChange(
                                  e,
                                  index,
                                  subTaskIndex,
                                  'description'
                                );
                              }}
                            />
                          </Box>
                        </Box>
                        <Box className="flex justify-center items-center">
                          <Box>
                            <Text className="text-slate-500">Encargado</Text>
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
                          </Box>
                        </Box>
                        <Box className="flex justify-center items-center">
                          <Box>
                            <Text className="text-slate-500">
                              Fecha de inicio
                            </Text>
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
                          </Box>
                        </Box>
                        <Box className="flex justify-center items-center">
                          <Box>
                            <Text className="text-slate-500">
                              Duracion en días
                            </Text>
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
                          </Box>
                        </Box>
                        <Box
                          className="p-2 rounded-full items-center flex bg-red-400 text-slate-100"
                          onClick={() => {
                            const updatedData = [...activities];
                            updatedData[index].subTasks = a.subTasks?.filter(
                              (t) => t.id !== st.id
                            );

                            setActivities(updatedData);
                            sendActivities(updatedData);
                          }}
                        >
                          <TrashIcon />
                        </Box>
                      </Flex>
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
