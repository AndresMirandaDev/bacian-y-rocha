'use client';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import { MdSubdirectoryArrowRight } from 'react-icons/md';

const fields = [
  { label: 'Descripción', id: 1 },
  { label: 'Encargado', id: 2 },
  { label: 'Fecha de inicio', id: 3 },
  { label: 'Duracion en días', id: 4 },
  { label: 'Acciones', id: 5 },
];

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

const ActivityForm = () => {
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

  const handleChange = (
    e: React.FormEvent,
    index: number,
    field: 'description' | 'assignedTo' | 'startDate' | 'durationInDays'
  ) => {
    const updatedData = [...activities];
    updatedData[index] = {
      ...updatedData[index],
      [field]: (e.target as HTMLInputElement).value,
    };
    setActivities(updatedData);
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
  };

  console.log(activities);

  return (
    <Flex direction="column" className="w-full">
      <Grid columns="5" className="mt-5 p-2 bg-[#013564] w-full">
        {fields.map((field) => {
          return (
            <Box className="flex justify-center items-center " key={field.id}>
              <Text className="text-slate-100 font-bold">{field.label}</Text>
            </Box>
          );
        })}
      </Grid>
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
      <Grid className="p-2" columns="5">
        {activities.map((a, index) => {
          return (
            <>
              <Box key={a.id} className="flex justify-center items-center mt-2">
                <textarea
                  className="border border-slate-300 rounded-md p-2"
                  onChange={(e) => {
                    handleChange(e, index, 'description');
                  }}
                />
              </Box>
              <Box key={a.id} className="flex justify-center items-center">
                <input
                  value={a.assignedTo}
                  className="border border-slate-300 rounded-md p-2"
                  onChange={(e) => {
                    handleChange(e, index, 'assignedTo');
                  }}
                />
              </Box>
              <Box key={a.id} className="flex justify-center items-center">
                <input
                  value={a.startDate}
                  className="border border-slate-300 rounded-md p-2"
                  onChange={(e) => {
                    handleChange(e, index, 'startDate');
                  }}
                  type="date"
                />
              </Box>
              <Box key={a.id} className="flex justify-center items-center">
                <input
                  value={a.durationInDays}
                  className="border border-slate-300 rounded-md p-2 text-center"
                  type="number"
                  onChange={(e) => {
                    handleChange(e, index, 'durationInDays');
                  }}
                />
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
              {a.subTasks && (
                <Flex direction="column" className="pl-7">
                  <Flex>
                    <Box className="mt-5 ">
                      <Text className="italic text-slate-400 text-xl">
                        Sub-tareas
                      </Text>
                    </Box>
                  </Flex>
                  <Flex direction="column">
                    {a.subTasks?.map((st) => {
                      return (
                        <Flex gap="4" align="center" key={st.id}>
                          <Box className="flex items-center">
                            <MdSubdirectoryArrowRight size="20" />
                          </Box>
                          <Box className="flex justify-center items-center mt-2">
                            <textarea
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleChange(e, index, 'description');
                              }}
                            />
                          </Box>
                          <Box className="flex justify-center items-center">
                            <input
                              value={st.assignedTo}
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleChange(e, index, 'assignedTo');
                              }}
                            />
                          </Box>
                          <Box className="flex justify-center items-center">
                            <input
                              value={st.startDate}
                              className="border border-slate-300 rounded-md p-2"
                              onChange={(e) => {
                                handleChange(e, index, 'startDate');
                              }}
                              type="date"
                            />
                          </Box>
                          <Box className="flex justify-center items-center">
                            <input
                              value={st.durationInDays}
                              className="border border-slate-300 rounded-md p-2 text-center"
                              type="number"
                              onChange={(e) => {
                                handleChange(e, index, 'durationInDays');
                              }}
                            />
                          </Box>
                          <Box
                            className="p-2 rounded-full items-center flex bg-red-400 text-slate-100"
                            onClick={() => {
                              const updatedData = [...activities];
                              updatedData[index].subTasks = a.subTasks?.filter(
                                (t) => t.id !== st.id
                              );

                              setActivities(updatedData);
                            }}
                          >
                            <TrashIcon />
                          </Box>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              )}
            </>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ActivityForm;
