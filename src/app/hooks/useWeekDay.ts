const weekDays: Record<number, string> = {
    0:'Domingo',
    1:'Lunes',
    2:'Martes',
    3:'Miércoles',
    4:'Jueves',
    5:'Viernes',
    6:'Sábado'
}

export default function useWeekDay(date : Date){
    const newDate = new Date(date)
    return weekDays[newDate.getDay()]
}