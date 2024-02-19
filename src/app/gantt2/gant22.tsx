// GanttChart.jsx
import React from 'react';

import { CalendarHeader } from './calendario';
import { parseISO, differenceInCalendarDays, startOfYear, endOfYear, addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

interface GanttChartProps {
  tasks: Task[];
}

export const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const yearStart = startOfYear(new Date());
  const yearEnd = endOfYear(new Date());
  
  // Calcula el número total de días laborables en el año
  const calculateWorkdays = (start:any, end:any) => {
    let count = 0;
    for (let day = start; day <= end; day = addDays(day, 1)) {
      if (day.getDay() !== 0 && day.getDay() !== 6) count++;
    }
    return count;
  };

  const totalWorkdays = calculateWorkdays(yearStart, yearEnd);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'scroll' }}>
      <CalendarHeader />
      <div style={{ position: 'relative', width: `${totalWorkdays * 20}px`, height: '200px' }}> {/* Ajusta según necesidad */}
        {tasks.map((task, index) => {
          const taskStart = parseISO(task.startDate);
          const taskEnd = parseISO(task.endDate);
          const offset = differenceInCalendarDays(taskStart, yearStart) - differenceInCalendarDays(taskStart, taskStart);
          const duration = differenceInCalendarDays(taskEnd, taskStart) + 1;
          const leftOffset = calculateWorkdays(yearStart, taskStart) * 20; // 20px por día laborable
          const taskWidth = calculateWorkdays(taskStart, taskEnd) * 20; // 20px por día laborable

          return (
            <div key={task.id} style={{
              position: 'absolute',
              left: `${leftOffset}px`,
              top: `${index * 30}px`, // Asegura que las tareas no se solapen verticalmente
              width: `${taskWidth}px`,
              height: '20px',
              backgroundColor: 'skyblue',
              textAlign: 'center',
            }}>
              {task.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
