interface Task {
    id: string;
    name: string;
    startDate: string; // ISO string format: 'YYYY-MM-DD'
    endDate: string; // ISO string format: 'YYYY-MM-DD'
  }
  
  interface GanttChartProps {
    tasks: Task[];
  }
  