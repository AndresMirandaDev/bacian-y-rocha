// WeeklyCalendar.tsx
import React, { useState, useEffect } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import { Locale } from 'date-fns';
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
  rows: string[]; // Nombres de las filas
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ tasks, rows }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 365; i++) {
      const day = addDays(startDate, i);
      days.push(
        <div key={i} className="day">
          <div className="day-label">{format(day, 'EEEE', { locale: esLocale as unknown as Locale })}</div>
          <div className="date mt-4 z">{format(day, 'd')}</div>

          {rows.map(row => (
            <div key={row} className="row-label">
         
            </div>
          ))}

          {tasks.map((task) => {
            const taskStartDate = new Date(task.startDate);
            const taskEndDate = addDays(taskStartDate, task.durationInDays - 1);

            if (day >= taskStartDate && day <= taskEndDate) {
              const dayIndex = format(day, 'd');
              const isStartDay = dayIndex === format(taskStartDate, 'd');
              const isEndDay = dayIndex === format(taskEndDate, 'd');

              return (
                <div
                  key={task.id}
                  className={`task${isStartDay ? ' start-day' : ''}${isEndDay ? ' end-day' : ''}`}
                >
                  <span className="chips h-[15px] cursor-pointer items-center justify-between rounded-[15px] bg-[#dc2626] px-[40px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200">
                    {task.description}
                  </span>
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    }
    return days;
  };

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => addDays(startOfWeek(prevDate), -7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addDays(startOfWeek(prevDate), 7));
  };

  return (
    <TransformWrapper>
      <div className="weekly-calendar  max-w-screen-md mx-auto">
        <TransformComponent>
          <div className="flex space-x-8">{getWeekDays(startOfWeek(currentDate))}</div>
        </TransformComponent>

        <div className="flex items-center justify-between mt-11">
          <button className="btn mr-11" onClick={handlePrevWeek}>
            Semana Anterior
          </button>

          <button className="btn ml-11" onClick={handleNextWeek}>
            Próxima Semana
          </button>

          <h2 className="text-center font-bold ml-10 ">
            {format(startOfWeek(currentDate), 'd/MM/yyyy', { locale: esLocale as unknown as Locale })}
          </h2>
        </div>
      </div>
    </TransformWrapper>
  );
};

export default WeeklyCalendar;
