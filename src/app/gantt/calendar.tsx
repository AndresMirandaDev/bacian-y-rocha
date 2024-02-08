import React, { useState } from 'react';
import { format, startOfYear, endOfYear, eachDayOfInterval, Locale } from 'date-fns';
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

const WeeklyCalendar = ({ tasks }: {tasks:any}) => {
  const currentDate = new Date();
  const startOfTheYear = startOfYear(currentDate);
  const endOfTheYear = endOfYear(currentDate);
  const daysOfYear = eachDayOfInterval({ start: startOfTheYear, end: endOfTheYear });

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e', '#1abc9c'];
  const getColorForTask = (index:any) => colors[index % colors.length];

  return (
    <TransformWrapper
   
    >
      <TransformComponent>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div style={{ display: 'flex', minWidth: `${daysOfYear.length * 30}px` }}> {/* Ensure sufficient width */}
            {daysOfYear.map((day, index) => (
              <div key={index} style={{ width: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', borderRight: '1px solid #ddd', padding: '2px' }}>
                <span>{format(day, 'EEE', { locale: esLocale  as unknown as Locale})}</span>
                <span>{format(day, 'd')}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'relative', minHeight: '200px' }}>
            {tasks.map((task:any, index:any) => {
              const taskStartDate = new Date(task.startDate);
              const startDayIndex = daysOfYear.findIndex(day => format(day, 'yyyy-M-dd') === format(taskStartDate, 'yyyy-M-dd'));
              const endDayIndex = startDayIndex + task.durationInDays - 1;
              const taskWidth = task.durationInDays * 30; // 30px per day
              return (
                <div key={task.id} style={{
                    position: 'absolute',
                    left: `${startDayIndex * 30}px`,
                    width: `${taskWidth}px`,
                    top: `${index * 22}px`, // Asegura que cada hito esté en una línea diferente
                    backgroundColor: getColorForTask(index),
                    color: 'white',
                    textAlign: 'center',
                    padding: '2px',
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
