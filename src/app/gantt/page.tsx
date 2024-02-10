'use client'
import React, { useState } from 'react';
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
  const [newTask, setNewTask] = useState({
    description: '',
    category: '',
    assignedTo: '',
    progress: 0,
    startDate: '',
    durationInDays: 0,
  });

  const addTask = () => {
    const newTaskWithId = { ...newTask, id: Date.now() }; // Agregar ID a la nueva tarea
    setTasks([...tasks, newTaskWithId]); // Añadir nueva tarea al inicio del array
    setNewTask({ // Resetear campos del formulario
      description: '',
      category: '',
      assignedTo: '',
      progress: 0,
      startDate: '',
      durationInDays: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Task) => {
    setNewTask({ ...newTask, [field]: e.target.value });
  };

  return (
   
    <div className="flex bg-gray-90 w-300">
      <div className="flex-1 ml-20 p-4">
        {/* Encabezados */}
        <div className="grow   grid grid-cols-6 gap-2 mb-4 text-white bg-blue-500 p-2">
          <div>Descripción</div>
          <div>Categoría</div>
          <div>Asignado</div>
          <div>Progreso (%)</div>
          <div>Inicio</div>
          <div className='col-span-1'>Días</div>
          
        </div>

        {/* Listado de tareas */}
        {tasks.map((task, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 mb-2">
            <div>{task.description}</div>
            <div>{task.category}</div>
            <div>{task.assignedTo}</div>
            <div>{task.progress}</div>
            <div>{task.startDate}</div>
            <div>{task.durationInDays}</div>
            <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="bg-red-500 rounded-full text-white w-6 h-6 flex items-center justify-center">-</button>
          </div>
        ))}

        {/* Inputs para añadir nueva tarea */}
        <div className="grid grid-cols-6 gap-2">
          <input type="text" value={newTask.description} onChange={(e) => handleInputChange(e, 'description')} />
          <input type="text" value={newTask.category} onChange={(e) => handleInputChange(e, 'category')} />
          <input type="text" value={newTask.assignedTo} onChange={(e) => handleInputChange(e, 'assignedTo')} />
          <input type="number" value={newTask.progress} onChange={(e) => handleInputChange(e, 'progress')} />
          <input type="date" value={newTask.startDate} onChange={(e) => handleInputChange(e, 'startDate')} />
          <input type="number" value={newTask.durationInDays} onChange={(e) => handleInputChange(e, 'durationInDays')} />
          
        </div>
        <button onClick={addTask} className="bg-green-500 rounded-full text-white w-6 h-6 flex items-center justify-center mt-5"> + </button>
      </div>

      <div className="w-1 p-4 ml-20">
        <WeeklyCalendar tasks={tasks} />
      </div>
    </div>
    
  );
};

export default GanttChart;
