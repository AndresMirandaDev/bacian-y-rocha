import { Table, Tooltip } from '@radix-ui/themes';
import React from 'react';

interface Task {
  name: string;
  start: number;
  duration: number;
  month: number;
  asignee: string;
  otherFields?: OtherFields[];
  progress: number;
}

interface GanttChartProps {
  tasks: Task[];
}

interface OtherFields {
  name: string;
  value: string;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const totalDuration = tasks.reduce((acc, task) => acc + task.duration, 0);

  // Assuming each day represents 3.33% of the total duration (100% / 30 days)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getColorForMonth = (month: number): string => {
    // You can define different colors for each month
    const colors = [
      'bg-red-200',
      'bg-blue-200',
      'bg-green-200',
      'bg-yellow-200',
      'bg-indigo-200',
      'bg-purple-200',
      'bg-pink-200',
      'bg-gray-200',
      'bg-orange-200',
      'bg-teal-200',
      'bg-cyan-200',
      'bg-brown-200',
    ];

    return colors[month % colors.length];
  };

  return (
    <div className="flex min-h-full">
      <div className="w-3/4 min-h-full overflow-auto">
        <Table.Root variant="surface" className="h-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Duración</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Asignación</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Progreso</Table.ColumnHeaderCell>
              {tasks
                .filter((task) => {
                  return task.otherFields;
                })
                .map((task) => {
                  return task.otherFields!.map((field) => {
                    return (
                      <Table.ColumnHeaderCell>
                        {field.name}
                      </Table.ColumnHeaderCell>
                    );
                  });
                })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map((t) => {
              return (
                <Table.Row>
                  <Table.Cell>{t.name}</Table.Cell>
                  <Table.Cell>{t.duration} días</Table.Cell>
                  <Table.Cell>{t.asignee}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      {t.progress}%
                      <progress
                        className="progress progress-info w-20"
                        value={t.progress}
                        max="100"
                      ></progress>
                    </div>
                  </Table.Cell>
                  {t.otherFields?.map((field) => {
                    return <Table.Cell>{field.value}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
      <div
        className="gantt-container overflow-x-auto"
        style={{ width: '100%' }}
      >
        <div className="gantt-chart bg-gray-200 flex">
          {months.map((month, index) => (
            <div key={index} className="month-container">
              <div className={`month text-center ${getColorForMonth(index)}`}>
                {month}
              </div>
              <div className="days flex flex-row">
                {days.map((day) => (
                  <div
                    key={day}
                    className="day border-r-2 p-2 w-[50px] bg-red-50 rounded-sm text-center"
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {tasks.map((t) => {
          const width = t.duration * 50;
          const monthStart = t.month * 50 * 31;
          return (
            <>
              <Tooltip
                content={
                  <div className="tooltip-content">
                    <div>Duración: {t.duration} días</div>
                    <div>Progreso: {t.progress}</div>
                    <div>Asignación: {t.asignee}</div>
                  </div>
                }
              >
                <div
                  className="bg-blue-200 rounded-sm text-center items-center flex justify-center hover:scale-110 transition-all duration-300 cursor-pointer hover:text-xl hover:text-white hover:bg-blue-500"
                  style={{ width, marginLeft: monthStart }}
                >
                  {t.name}
                </div>
              </Tooltip>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default GanttChart;
