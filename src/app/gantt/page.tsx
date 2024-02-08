'use client'
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import WeeklyCalendar from './calendar';

interface Task {
  id: number;
  description: string;
  category: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
}

const GanttChart: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const mockData: Task[] = [
      {
        id: 1,
        description: 'Hito1',
        category: 'Categoria A',
        assignedTo: 'Usuario 1',
        progress: 30,
        startDate: '2024-02-06',
        durationInDays:3,
      },
      {
        id: 1,
        description: 'Hito8',
        category: 'Categoria A',
        assignedTo: 'Usuario 1',
        progress: 30,
        startDate: '2024-02-07',
        durationInDays: 8,
      },
      {
        id: 1,
        description: 'Hito4',
        category: 'Categoria A',
        assignedTo: 'Usuario 1',
        progress: 30,
        startDate: '2024-02-11',
        durationInDays:3,
      },
      {
        id: 1,
        description: 'Hito3',
        category: 'Categoria A',
        assignedTo: 'Usuario 1',
        progress: 30,
        startDate: '2024-02-07',
        durationInDays: 8,
      },
      {
        id: 2,
        description: 'Hito7',
        category: 'Categoria B',
        assignedTo: 'Usuario 2',
        progress: 50,
        startDate: '2024-02-7',
        durationInDays: 6,
      },
    ];

    setTasks(mockData);
  }, []);

  const rows = ['Fila 1', 'Fila 2'];

  return (
    <div className="container bg-gray-200 p-4">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="font-bold mb-4 text-white" style={{ background: '#3498db' }}>Descripción del hito</div>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2">
              {task.description}
            </div>
          ))}
        </div>

        <div className="col-span-1">
          <div className="font-bold mb-4 text-white" style={{ background: '#3498db' }}>Categoría</div>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2">
              {task.category}
            </div>
          ))}
        </div>

        <div className="col-span-1">
          <div className="font-bold mb-4 text-white" style={{ background: '#3498db' }}>Asignado</div>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2">
              {task.assignedTo}
            </div>
          ))}
        </div>

        <div>
          <div className="font-bold mb-4 text-white" style={{ background: '#3498db' }}>Progreso</div>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2">
              {task.progress}%
            </div>
          ))}
        </div>

        <div className="col-span-1">
          <div className="font-bold mb-4 text-white" style={{ background: '#3498db' }}>Inicio</div>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2">
              {task.startDate}
            </div>
          ))}
        </div>

        <div className="col-span-1">
          <div className="font-bold mb-4 text-white" style={{ background: '#3498db' }}>Días</div>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2 ml-5">
              {task.durationInDays}
            </div>
          ))}
        </div>

        <div className='ml-3'>
          <WeeklyCalendar tasks={tasks}/>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
