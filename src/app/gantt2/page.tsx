// App.jsx
import React from 'react';
import { GanttChart } from './gant22'; // Ajusta la ruta de importación según sea necesario

const App = () => {
  const tasks = [
    {
      id: '1',
      name: 'Tarea 1',
      startDate: '2023-01-03',
      endDate: '2023-01-05',
    },
    {
      id: '2',
      name: 'Tarea 2',
      startDate: '2023-01-08',
      endDate: '2023-01-15',
    },
    // Agrega más tareas según sea necesario
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <h1>Carta Gantt del Año</h1>
      <GanttChart tasks={tasks} />
    </div>
  );
};

export default App;
