'use client'
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import WeeklyCalendar from './calendar';
import { mockTasks } from './mock';

interface SubTask {
  id: number;
  description: string;
  category: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
 
}

export interface Task  {
  id: number;
  description: string;
  category: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
  subTasks?: SubTask[]
}
const GanttChart: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState({
    id:0,
    description: '',
    category: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Task) => {
    setNewTask({ ...newTask, [field]: e.target.value });
  };
  const handleSubTaskChange = (e: React.ChangeEvent<HTMLInputElement>, taskIndex: number, subTaskIndex: number, field: keyof SubTask) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        const updatedSubTasks = task.subTasks?.map((subTask, sIndex) => {
          if (sIndex === subTaskIndex) {
            return { ...subTask, [field]: e.target.value };
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
  <React.Fragment key={task.id}>
    <div className="grid grid-cols-6 gap-2 mb-2 items-center">
      <div>{task.description} (Padre)</div>
      <div>{task.category}</div>
      <div>{task.assignedTo}</div>
      {/* Contenedor de la barra de progreso */}
      <div className="col-span-1 flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${task.progress}%`}}></div>
        </div>
        {`${task.progress}%`}
      </div>
      <div>{task.startDate}</div>
      <div>{task.durationInDays}</div>
    </div>
    {task.subTasks && task.subTasks.map((subTask, subIndex) => (
      <div key={subTask.id} className="grid grid-cols-6 gap-2 mb-2 pl-4 bg-gray-100 items-center">
        <div>{subTask.description}</div>
        <div>{subTask.category}</div>
        <div>{subTask.assignedTo}</div>
        {/* Input de rango para ajustar el progreso */}
        <div className="col-span-1">
          <input type="range" min="0" max="100" value={subTask.progress} onChange={(e) => handleSubTaskChange(e, index, subIndex, 'progress')} className="w-full range range-primary" />
          <div className="flex justify-between text-xs px-2">
            {`${subTask.progress}%`}
          </div>
        </div>
        <div>{subTask.startDate}</div>
        <div>{subTask.durationInDays}</div>
      </div>
    ))}
  </React.Fragment>
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

      <div className="w-1 p-4 ml-10">
        <WeeklyCalendar tasks={tasks} />
      </div>
    </div>
    
  );
};

export default GanttChart;
