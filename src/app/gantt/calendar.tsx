import React, { useState } from 'react';
import { format, parseISO, startOfYear, endOfYear, eachDayOfInterval, isWithinInterval, Locale } from 'date-fns';
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

const WeeklyCalendar = ({ tasks }: { tasks: Task[] }) => {
  const currentDate = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(startOfYear(currentDate));
  const [selectedEndDate, setSelectedEndDate] = useState(endOfYear(currentDate));

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStartDate(parseISO(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEndDate(parseISO(e.target.value));
  };

  const daysInRange = eachDayOfInterval({ start: selectedStartDate, end: selectedEndDate });

  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e', '#1abc9c'];
  const getColorForTask = (index: number) => colors[index % colors.length];

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.1}
      maxScale={4}
      limitToBounds={true}
      wheel={{ step: 0.2 }}
    >
      <TransformComponent>
        <div className="overflow-x-auto">
          <div className="flex justify-start mb-4">
            <input type="date" value={format(selectedStartDate, 'yyyy-MM-dd')} onChange={handleStartDateChange} className="mr-2" />
            <input type="date" value={format(selectedEndDate, 'yyyy-MM-dd')} onChange={handleEndDateChange} />
          </div>
          <div style={{ display: 'flex', minWidth: `${daysInRange.length * 30}px` }}>
            {daysInRange.map((day, index) => (
              <div key={index} style={{ width: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', borderRight: '1px solid #ddd', padding: '2px' }}>
                <span>{format(day, 'EEE', { locale: esLocale as unknown as Locale })}</span>
                <span>{format(day, 'd')}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'relative', minHeight: '150px' }}>
            {tasks.filter(task => isWithinInterval(parseISO(task.startDate), { start: selectedStartDate, end: selectedEndDate }))
              .map((task, index) => {
                const taskStart = parseISO(task.startDate);
                const startDayIndex = daysInRange.findIndex(day => format(day, 'yyyy-MM-dd') === format(taskStart, 'yyyy-MM-dd'));
                if (startDayIndex === -1) return null; // Si la tarea no está dentro del rango, no se renderiza

                const taskWidth = task.durationInDays * 30; // Asume 30px por día
                return (
                  <div key={task.id} style={{
                    position: 'absolute',
                    left: `${startDayIndex * 30}px`,
                    width: `${taskWidth}px`,
                    top: `${index * 30}px`,
                    backgroundColor: getColorForTask(index),
                    color: 'white',
                    textAlign: 'center',
                    padding: '1px',
                    borderRadius: '4px',
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
