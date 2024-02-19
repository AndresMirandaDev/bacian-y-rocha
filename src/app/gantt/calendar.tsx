import React, { useState } from 'react';
import {
  format,
  parseISO,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  isWithinInterval,
  Locale,
} from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Task } from './GanttChart'; // Asegúrate de que la importación sea correcta según tu estructura de archivos

const WeeklyCalendar = ({ tasks }: { tasks: Task[] }) => {
  const currentDate = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(
    startOfYear(currentDate)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    endOfYear(currentDate)
  );

  const daysInRange = eachDayOfInterval({
    start: selectedStartDate,
    end: selectedEndDate,
  });

  const getColorForTask = (index: number) => {
    const colors = [
      '#3498db',
      '#e74c3c',
      '#2ecc71',
      '#f1c40f',
      '#9b59b6',
      '#34495e',
      '#1abc9c',
    ];
    return colors[index % colors.length];
  };

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
            <input
              type="date"
              value={format(selectedStartDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedStartDate(parseISO(e.target.value))}
              className="mr-2"
            />
            <input
              type="date"
              value={format(selectedEndDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedEndDate(parseISO(e.target.value))}
            />
          </div>
          <div
            style={{
              display: 'flex',
              minWidth: `${daysInRange.length * 30}px`,
            }}
          >
            {daysInRange.map((day, index) => (
              <div
                key={index}
                style={{
                  width: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: '10px',
                  borderRight: '1px solid #ddd',
                  padding: '2px',
                }}
              >
                <span>
                  {format(day, 'EEE', {
                    locale: esLocale as unknown as Locale,
                  })}
                </span>
                <span>{format(day, 'd')}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'relative', minHeight: '150px' }}>
            {tasks
              .filter(
                (task) =>
                  task.startDate &&
                  isWithinInterval(parseISO(task.startDate), {
                    start: selectedStartDate,
                    end: selectedEndDate,
                  })
              )
              .sort(
                (a, b) =>
                  new Date(a.startDate).getTime() -
                  new Date(b.startDate).getTime()
              )
              .flatMap((task, index) => [
                ...(task.subTasks?.map((subTask, subIndex) => {
                  const left =
                    daysInRange.findIndex(
                      (day) =>
                        format(day, 'yyyy-MM-dd') ===
                        format(parseISO(subTask.startDate), 'yyyy-MM-dd')
                    ) *
                      30 +
                    5;
                  const top = index * 30 + subIndex * 30 + 40; // Ajusta el espacio vertical entre tareas
                  const width = subTask.durationInDays * 30;
                  return (
                    <div
                      key={subTask.id}
                      className="absolute"
                      style={{
                        left: `${left}px`,
                        top: `${top}px`,
                        width: `${width}px`,
                      }}
                    >
                      <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-4 rounded-full"
                          style={{ width: `${subTask.progress}%` }}
                        ></div>
                      </div>
                      <span
                        className="absolute w-full text-center text-xs"
                        style={{ left: '0px' }}
                      >
                        {subTask.description} - {subTask.progress}%
                      </span>
                    </div>
                  );
                }) || []),
              ])}
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default WeeklyCalendar;
