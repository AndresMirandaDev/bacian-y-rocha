'use client';
import Spinner from '@/app/components/Spinner';
import { SubTask, WorkOrder } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { Task as Activity } from '@prisma/client';
import { addDays } from 'date-fns';
import { Box, Card, Flex, Text } from '@radix-ui/themes';

interface Props {
  workOrder: WorkOrder;
}

const prepareData = (activities: Activity[]) => {
  let data: any[] = [];
  activities.forEach((a) => {
    data.push({
      start: new Date(a.startDate),
      end: addDays(a.startDate, a.durationInDays),
      name: a.name,
      id: a.id,
      type: 'project',
      progress: a.progress,
      isDisabled: true,
      styles: {
        progressColor: '#ffbb54',
        progressSelectedColor: '#ff9e0d',
      },
      assignation: a.assignedTo,
    });
    a.subTasks.forEach((st) => {
      data.push({
        start: new Date(st.startDate),
        end: addDays(st.startDate, a.durationInDays),
        name: st.name,
        id: st.id,
        type: 'task',
        progress: st.progress,
        isDisabled: true,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        assignation: st.assignedTo,
      });
    });
  });
  return data;
};

const TestChart = ({ workOrder }: Props) => {
  const [tasks, setTasks] = useState<any>();

  useEffect(() => {
    const data = prepareData(workOrder.activities);
    setTasks(data);
  }, [workOrder]);

  if (!tasks) return <div>loading</div>;

  return (
    <Gantt
      tasks={tasks}
      locale="es"
      todayColor="rgba(208,57,34,0.5858718487394958)"
      projectBackgroundColor="rgba(34,78,208,0.5858718487394958)"
      TooltipContent={({ task }: any) => {
        return (
          <Card>
            <Flex direction="column">
              <Flex gap="3">
                <Text className="text-slate-500">Nombre actividad:</Text>
                <Text className="font-semibold capitalize">{task.name}</Text>
              </Flex>
              <Flex gap="3">
                <Text className="text-slate-500">Fecha inicio:</Text>
                <Text className="font-semibold">
                  {task.start.toLocaleDateString()}
                </Text>
              </Flex>
              <Flex gap="3">
                <Text className="text-slate-500">Fecha término:</Text>
                <Text className="font-semibold">
                  {task.end.toLocaleDateString()}
                </Text>
              </Flex>
              <Flex gap="3">
                <Text className="text-slate-500">Progreso:</Text>
                <Text className="font-semibold">{task.progress}%</Text>
              </Flex>
              <Flex gap="3">
                <Text className="text-slate-500">Asignado a:</Text>
                <Text className="font-semibold">{task.assignation}</Text>
              </Flex>
            </Flex>
          </Card>
        );
      }}
    />
  );
};

export default TestChart;
