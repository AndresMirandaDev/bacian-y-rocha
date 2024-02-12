import React, { useState } from 'react';
import { format, parseISO, startOfYear, endOfYear, eachDayOfInterval, isWithinInterval, Locale } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {Task} from './page'



const WeeklyCalendar = ({ tasks }: { tasks: Task[] }) => {
 tasks.map(i=>{
  console.log("aca el i hghwuisxbkw1 ", i.subTasks?.map(e=>e.description))
 })

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

  // Función para dibujar una flecha entre tareas
  const drawArrowBetweenTasks = (startDayIndex:any, taskWidth:any, currentIndex:any, nextTaskStartDayIndex:any, nextTaskIndex:any) => {
    if (nextTaskStartDayIndex === -1 || startDayIndex === -1 || nextTaskStartDayIndex < startDayIndex) {
      // Omite el dibujo de la flecha si la "siguiente" tarea está cronológicamente antes de la actual
      return null;
    }
  
    // Cálculos para la posición y longitud de la flecha
    const startPositionX = startDayIndex * 30 + taskWidth;
    const endPositionX = nextTaskStartDayIndex * 30;
    const startPositionY = currentIndex * 30 + 15;
    const endPositionY = nextTaskIndex * 30 + 15; // Ajusta según tu diseño para la "fila" de la próxima tarea
  
    // Segmento horizontal desde la tarea actual hacia la derecha
    const horizontalLineStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${startDayIndex * 30 + taskWidth}px`,
      width: '10px', // Longitud fija para el segmento horizontal inicial
      top: `${currentIndex * 30 + 15}px`,
      height: '2px',
      backgroundColor: 'black',
    };
  
    const verticalLineStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${startDayIndex * 30 + taskWidth + 10}px`, // Continúa desde el final del segmento horizontal
      width: '2px',
      top: `${currentIndex * 30 + 15}px`,
      height: `${nextTaskIndex * 30 + 15 - (currentIndex * 30 + 15)}px`, // Calcula la altura para llegar a la fila de la próxima tarea
      backgroundColor: 'black',
    };
  
    const horizontalLineToNextStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${startDayIndex * 30 + taskWidth + 10}px`, // Inicia donde termina el segmento vertical
      width: `${nextTaskStartDayIndex * 30 - (startDayIndex * 30 + taskWidth + 10)}px`, // Longitud hasta el inicio de la próxima tarea
      top: `${nextTaskIndex * 30 + 15}px`, // Alineado con la altura de la fila de la próxima tarea
      height: '2px',
      backgroundColor: 'black',
    };
  
    return (
      <>
       <div style={horizontalLineStyle}></div>
      <div style={verticalLineStyle}></div>
      <div style={horizontalLineToNextStyle}></div>
      </>
    );
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
  {tasks.filter(task => task.startDate && isWithinInterval(parseISO(task.startDate), { start: selectedStartDate, end: selectedEndDate }))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) // Asegurarse de que las tareas estén ordenadas por fecha de inicio
    .flatMap((task, index) => [ // Usamos flatMap para combinar tareas y subtareas en un solo array
      <div key={task.id} style={{
        position: 'absolute',
        left: `${daysInRange.findIndex(day => format(day, 'yyyy-MM-dd') === format(parseISO(task.startDate), 'yyyy-MM-dd')) * 30}px`,
        width: `${task.durationInDays * 30}px`,
        top: `${index * 30}px`,
        backgroundColor: getColorForTask(index),
        color: 'white',
        textAlign: 'center',
        padding: '1px',
        borderRadius: '4px',
      }}>
        {task.description}
      </div>,
      // Aquí iteramos sobre las subtareas, si existen
      // Asegúrate de que este cálculo se realice correctamente para las subtareas
      ...(task.subTasks?.map(subTask => (
        <div key={subTask.id} style={{
          position: 'absolute',
          left: `${daysInRange.findIndex(day => format(day, 'yyyy-MM-dd') === format(parseISO(subTask.startDate), 'yyyy-MM-dd')) * 30 + 5}px`,
          width: `${subTask.durationInDays * 30}px`,
          top: `${(index + 1) * 30}px`, // Ajustar según sea necesario
          backgroundColor: getColorForTask(index + 1),
          color: 'black',
          textAlign: 'center',
          padding: '1px',
          borderRadius: '4px',
        }}>
          {subTask.description} (Subtarea)
        </div>
      ))
       || [])
    ])}
</div>

        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default WeeklyCalendar;
