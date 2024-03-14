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
    />
  );
};

export default TestChart;
