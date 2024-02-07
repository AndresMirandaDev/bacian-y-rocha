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
  const endDateOfWeek = addDays(startDateOfWeek, 6);

  return (
    <TransformWrapper>
      <TransformComponent>
        <div className="flex flex-col items-center">
          <div className="flex mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevWeek}>
              Semana Anterior
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextWeek}>
              Próxima Semana
            </button>
          </div>
          <div className="weekly-calendar max-w-screen-md mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: 'black' }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
                {format(addDays(startDateOfWeek, i), 'EEEE, d MMM', { locale: esLocale as unknown as Locale })}
              </div>
            ))}
            {tasks.map((task, index) => {
              const startDayIndex = differenceInCalendarDays(new Date(task.startDate), startDateOfWeek);
              const endDayIndex = startDayIndex + task.durationInDays - 1;
              if (startDayIndex >= 0 && startDayIndex < 7) { // Asegurarse de que la tarea comience en la semana actual
                return (
                  <div key={task.id} style={{
                    gridColumnStart: startDayIndex + 1,
                    gridColumnEnd: endDayIndex + 2,
                    gridRow: index + 2, // Evitar solapamiento con los encabezados de días
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '2px',
                    borderRadius: '4px',
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
    </TransformWrapper>
  );
};

export default WeeklyCalendar;
