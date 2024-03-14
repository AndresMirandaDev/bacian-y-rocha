'use client';
import colors from '@/app/styles/colors';
import { SubTask, Task, WorkOrder } from '@prisma/client';
import { Box, Flex, Grid, ScrollArea, Separator, Text } from '@radix-ui/themes';
import { Locale, eachDayOfInterval, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import esLocale from 'date-fns/locale/es';
import GanttAccordion from './GanttAccordion';

interface Props {
  workOrder: WorkOrder;
}

const GanttChartX = ({ workOrder }: Props) => {
  const [selectedStartDate, setSelectedStartDate] = useState(
    workOrder.startDate
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    workOrder.estimatedDate
  );

  const daysInRange = eachDayOfInterval({
    start: selectedStartDate,
    end: selectedEndDate,
  });

  const chartHeader = [
    { label: 'Nombre', id: 1 },
    { label: 'Asignado a', id: 2 },
    { label: 'Progreso', id: 3 },
    { label: 'Inicio', id: 4 },
    { label: 'Días', id: 5 },
  ];

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

  return (
    <Grid className="w-full" columns="1">
      <Flex
        className=" w-full p-3 rounded-sm shadow-lg col-span-full"
        style={{ backgroundColor: colors.tableHead }}
        direction="column"
        gap="3"
      >
        <Box>
          <Text className="text-slate-100 font-bold text-2xl capitalize">
            {workOrder.componentName}
          </Text>
        </Box>
        <Separator size="4" />
        <Flex align="center" gap="4">
          <Text className="text-slate-100 text-xl">Cliente:</Text>
          <Text className="text-slate-100 text-2xl capitalize">
            {workOrder.client}
          </Text>
        </Flex>
        <Separator size="4" />
        <Flex gap="4" align="center">
          <Text className="text-slate-100 text-xl">
            Fecha Inicio del proyecto:
          </Text>
          <Text className="text-slate-100  text-2xl capitalize">
            {workOrder.startDate.toLocaleDateString()}
          </Text>
        </Flex>
      </Flex>
      <Flex
        className="w-full bg-slate-700 mt-5 rounded-sm text-slate-100"
        align="center"
      >
        <Flex
          className="w-1/2 border-r-2 border-slate-500 h-full"
          align="center"
        >
          {chartHeader.map((h) => {
            return (
              <Box key={h.id} className="w-full text-center ">
                <Text className="font-bold ">{h.label}</Text>
              </Box>
            );
          })}
        </Flex>
        <ScrollArea className="w-1/2">
          <Flex>
            {daysInRange.map((day, index) => {
              return (
                <Flex
                  key={index}
                  className="p-1 w-[100px] border-slate-400 border-r"
                  direction="column"
                  align="center"
                >
                  <span>
                    {format(day, 'EEE', {
                      locale: esLocale as unknown as Locale,
                    })}
                  </span>
                  <span>{format(day, 'd')}</span>
                </Flex>
              );
            })}
          </Flex>
        </ScrollArea>
      </Flex>
      {tasks.map((a, index) => {
        return (
          <GanttAccordion
            task={a}
            index={index}
            handleSubTaskChange={handleSubTaskChange}
            workOrderStartDate={workOrder.startDate}
          />
        );
      })}
    </Grid>
  );
};

export default GanttChartX;
