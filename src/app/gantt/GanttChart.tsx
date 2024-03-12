'use client';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import WeeklyCalendar from './calendar';
import { mockTasks } from './mock';
import { Task, WorkOrder } from '@prisma/client';
import { addDays, subDays } from 'date-fns';
import {
  Box,
  Button,
  Card,
  Flex,
  ScrollArea,
  Separator,
  Text,
} from '@radix-ui/themes';
import GanntActivityAccordion from './_components/GanntActivityAccordion';
import { FaSave } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

interface SubTask {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
}

// export interface Task {
//   id: string;
//   description: string;
//   assignedTo: string;
//   progress: number;
//   startDate: string;
//   durationInDays: number;
//   subTasks?: SubTask[];
// }

interface Props {
  workOrder: WorkOrder;
}

const GanttChart = ({ workOrder }: Props) => {
  useEffect(() => {
    if (workOrder) {
      setTasks(workOrder.activities);
    }
  }, [workOrder]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    id: '0',
    description: '',
    assignedTo: '',
    progress: 0,
    startDate: '',
    durationInDays: 0,
    subTasks: [],
  });

  // const addTask = () => {
  //   const newTaskWithId = { ...newTask, id: Date.now() }; // Agregar ID a la nueva tarea
  //   setTasks([...tasks, newTaskWithId]); // Añadir nueva tarea al inicio del array
  //   setNewTask({ // Resetear campos del formulario
  //     id:0,
  //     description: '',
  //     category: '',
  //     assignedTo: '',
  //     progress: 0,
  //     startDate: '',
  //     durationInDays: 0,
  //     subTasks: [],
  //   });
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Task
  ) => {
    setNewTask({ ...newTask, [field]: e.target.value });
  };
  const handleSubTaskChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskIndex: number,
    subTaskIndex: number,
    field: keyof SubTask
  ) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        const updatedSubTasks = task.subTasks?.map((subTask, sIndex) => {
          if (sIndex === subTaskIndex) {
            if (field === 'progress') {
              return { ...subTask, [field]: parseInt(e.target.value) };
            } else {
              return { ...subTask, [field]: e.target.value };
            }
          }
          return subTask;
        });
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`/api/workorders/${workOrder.id}`, {
        activities: tasks,
      });
      toast.success('Cambios guardados.');
    } catch (error) {
      console.log(error);
      toast.error('No se pudieron guardar los cambios.');
    }
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <Flex
          direction="column"
          gap="3"
          className="bg-stone-600 p-3 shadow-xl rounded-lg "
        >
          <Flex direction="column">
            <Box>
              <Text className="text-xl text-slate-100">
                N° Orden de trabajo
              </Text>
            </Box>
            <Box>
              <Text className="text-slate-200">{workOrder.number}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl text-slate-100">Cliente</Text>
            </Box>
            <Box>
              <Text className="text-slate-200">{workOrder.client}</Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl text-slate-100">Fecha de inicio</Text>
            </Box>
            <Box>
              <Text className="text-slate-200">
                {workOrder.startDate.toLocaleDateString()}
              </Text>
            </Box>
            <Separator size="4" />
          </Flex>
          <Flex direction="column">
            <Box>
              <Text className="text-xl text-slate-100">
                Fecha estimada de entrega
              </Text>
            </Box>
            <Box>
              <Text className="text-slate-200">
                {workOrder.estimatedDate.toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex>
          <Box>
            <Button onClick={handleSave}>
              <FaSave />
              Guardar Cambios
            </Button>
          </Box>
        </Flex>
        <Flex
          className="bg-slate-100 calculate-height w-fit shadow-lg border border-slate-300 rounded-lg"
          direction={{
            initial: 'column',
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
          gap="4"
        >
          {/* Listado de actividades */}
          <div className="flex-grow bg-slate-300">
            {tasks.map((task, index) => (
              <GanntActivityAccordion
                task={task}
                handleSubTaskChange={handleSubTaskChange}
                index={index}
                key={task.id}
              />
            ))}

            {/* Inputs para añadir nueva tarea */}
            {/* <div className="grid grid-cols-6 gap-2">
          <input type="text" value={newTask.description} onChange={(e) => handleInputChange(e, 'description')} />
          <input type="text" value={newTask.category} onChange={(e) => handleInputChange(e, 'category')} />
          <input type="text" value={newTask.assignedTo} onChange={(e) => handleInputChange(e, 'assignedTo')} />
          <input type="number" value={newTask.progress} onChange={(e) => handleInputChange(e, 'progress')} />
          <input type="date" value={newTask.startDate} onChange={(e) => handleInputChange(e, 'startDate')} />
          <input type="number" value={newTask.durationInDays} onChange={(e) => handleInputChange(e, 'durationInDays')} />
          
        </div> */}
            {/* <button onClick={addTask} className="bg-green-500 rounded-full text-white w-6 h-6 flex items-center justify-center mt-5"> + </button> */}
          </div>
          {/* Calendario */}
          <div className="p-4 bg-slate-100 rounded-xl mb-5 max-w-prose h-full min-w-[65ch]">
            <ScrollArea>
              <WeeklyCalendar
                tasks={tasks}
                workOrderStart={subDays(workOrder.startDate, 2)}
                workOrderEnd={addDays(workOrder.estimatedDate, 2)}
              />
            </ScrollArea>
          </div>
        </Flex>
      </Flex>
      <Toaster />
    </>
  );
};

export default GanttChart;
