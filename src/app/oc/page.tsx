import React from 'react';
import GanttChart from '../components/ganttChart/GantChart';

const OCPage = () => {
  const tasks = [
    {
      name: 'Task 1',
      start: 0,
      duration: 3,
      month: 4,
      asignee: 'Persona 1',
      otherFields: [
        { name: 'campo 1', value: '4' },
        { name: 'campo 2', value: 'algo' },
        { name: 'campo 3', value: '3' },
      ],
      progress: 30,
    },
    {
      name: 'Task 2',
      start: 3,
      duration: 5,
      month: 0,
      asignee: 'Persona 2',
      progress: 10,
    },
    {
      name: 'Task 3',
      start: 8,
      duration: 2,
      month: 3,
      asignee: 'Persona 3',
      progress: 50,
    },
  ];
  return <GanttChart tasks={tasks} />;
};

export default OCPage;
