// CalendarHeader.jsx
import React from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

export const CalendarHeader = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Asegúrate de que la semana comience en lunes

  const days = [];
  for (let i = 0; i < 365; i++) {
    // Agrega solo los días de la semana (lunes a viernes)
    const day = addDays(startDate, i);
    if (day.getDay() !== 0 && day.getDay() !== 6) { // Excluye sábado y domingo
      days.push(day);
    }
  }

  return (
    <div style={{ display: 'flex', overflowX: 'auto', width: '100%' }}>
      {days.map((day, index) => (
        <div key={index} style={{ minWidth: '60px', textAlign: 'center' }}>
          {format(day, 'EEE dd/MM', { locale: es })}
        </div>
      ))}
    </div>
  );
};
