import React, { useState } from 'react';
import { addDays, format, startOfWeek, differenceInCalendarDays, Locale } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface Task {
  id: number;
  description: string;
  category: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
}

interface WeeklyCalendarProps {
  tasks: Task[];
  rows: string[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ tasks, rows }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 7));
  };

  const startDateOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

  // Definir un arreglo de colores para los hitos
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e', '#1abc9c'];

  // Función para obtener un color basado en el índice o alguna propiedad del hito
  const getColorForTask = (index: number) => colors[index % colors.length];

  return (
    <TransformWrapper>
      <TransformComponent>
        <div className="flex flex-col items-center">
          <div className="weekly-calendar max-w-screen-md mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ padding: '5px' }}>
                {format(addDays(startDateOfWeek, i), 'EEEE, d', { locale: esLocale as unknown as Locale })}
              </div>
            ))}
            {tasks.map((task, index) => {
              const startDayIndex = differenceInCalendarDays(new Date(task.startDate), startDateOfWeek);
              const endDayIndex = startDayIndex + task.durationInDays - 1;
              const taskColor = getColorForTask(index); // Obtener el color para este hito
              if (startDayIndex >= 0 && startDayIndex < 7) {
                return (
                  <div key={task.id} style={{
                    gridColumnStart: startDayIndex + 1,
                    gridColumnEnd: endDayIndex + 2,
                    gridRow: index + 2,
                    backgroundColor: taskColor, // Usar el color seleccionado
                    color: 'white',
                    padding: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1px',
                    borderRadius: '10px',
                  }}>
                    {task.description}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </TransformComponent>
      <div className="flex mt-10 ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mr-14" onClick={handlePrevWeek}>
          Semana Anterior
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded" onClick={handleNextWeek}>
          Próxima Semana
        </button>
      </div>
    </TransformWrapper>
  );
};

export default WeeklyCalendar;
