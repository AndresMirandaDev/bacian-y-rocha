import React from 'react';
import { format, startOfYear, endOfYear, eachDayOfInterval, isSameDay, parseISO, Locale } from 'date-fns';
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

const WeeklyCalendar = ({ tasks }: {tasks: Task[]}) => {
  const currentDate = new Date();
  const startOfTheYear = startOfYear(currentDate);
  const endOfTheYear = endOfYear(currentDate);
  const daysOfYear = eachDayOfInterval({ start: startOfTheYear, end: endOfTheYear });

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e', '#1abc9c'];
  const getColorForTask = (index: number) => colors[index % colors.length];

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.1}
      maxScale={20} // Aumenta para permitir un zoom más significativo
      limitToBounds={false}
      wheel={{
        step: 0.5, // Ajusta la sensibilidad del zoom con el scroll del mouse
      }}
      pinch={{
        disabled: false,
      }}
      doubleClick={{
        disabled: true, // Opcional: Deshabilita el zoom con doble clic si lo prefieres
      }}
    >
      <TransformComponent>
        <div style={{ width: '90%', overflowX: 'auto' }}>
          <div style={{ display: 'flex', minWidth: `${daysOfYear.length * 30}px` }}>
            {daysOfYear.map((day, index) => (
              <div key={index} style={{ width: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', borderRight: '1px solid #ddd', padding: '2px' }}>
                <span>{format(day, 'EEE', { locale: esLocale as unknown as Locale})}</span>
                <span className='mb-2'>{format(day, 'd')}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'relative', minHeight: '150px' }}>
            {tasks.map((task, index) => {
              const taskStartDate = parseISO(task.startDate);
              const startDayIndex = daysOfYear.findIndex(day => isSameDay(day, taskStartDate));
              
              const taskWidth = task.durationInDays * 30; // Asume 30px por día
              return (
                <div key={task.id} style={{
                  position: 'absolute',
                  left: `${startDayIndex * 30}px`,
                  width: `${taskWidth}px`,
                  top: `${index * 30}px`, // Posiciona las tareas en filas separadas
                  backgroundColor: getColorForTask(index),
                  color: 'white',
                  textAlign: 'center',
                  padding: '1px',
                  borderRadius: '20px',
                }}>
                  {task.description}
                </div>
              );
            })}
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default WeeklyCalendar;
