import { SubTask, WorkOrder } from '@prisma/client';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import React from 'react';
import logo from '../../../../public/assets/images/byrs.png';

interface Task {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  progress: number;
  startDate: string;
  durationInDays: number;
  subTasks?: Task[];
  hours?: number;
  hourPrice?: number;
  photos?: string[];
  position?: string;
}

interface Props {
  workOrder: WorkOrder;
  tasks: Task[];
}

Font.register({
  family: 'Economica',
  src: 'https://fonts.gstatic.com/s/economica/v4/jObgDQiPUtmACAaaK3pMG6CWcynf_cDxXwCLxiixG1c.ttf',
});

const WorkOrderPDF = ({ workOrder, tasks }: Props) => {
  const allDates: string[] = [];
  const startDate = new Date(
    Math.min(...tasks.map((task) => new Date(task.startDate).getTime()))
  );
  const endDate = new Date(
    Math.max(
      ...tasks.map(
        (task) =>
          new Date(task.startDate).getTime() + task.durationInDays * 86400000
      )
    )
  );

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    allDates.push(new Date(date).toISOString().split('T')[0]);
  }

  const renderGanttCells = (task: Task) => {
    const taskStartDate = new Date(task.startDate);
    return allDates.map((date) => {
      const currentDate = new Date(date);
      const isFilled =
        currentDate >= taskStartDate &&
        currentDate <
          new Date(taskStartDate.getTime() + task.durationInDays * 86400000);
      return (
        <Text
          style={isFilled ? styles.filledDayCell : styles.dayCell}
          key={date}
        >
          {isFilled ? 'X' : ''}
        </Text>
      );
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View style={styles.header}>
            <Image src={logo.src} style={styles.logo} />
            <View style={{ paddingRight: 5 }}>
              <Text>Orden de trabajo {workOrder.number}</Text>
              <Text>Cliente {workOrder.client}</Text>
              <Text>Componente {workOrder.componentName}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.task}>
              <Text style={styles.taskName}>Tarea/Subtarea</Text>
              <View style={styles.ganttChart}>
                {allDates.map((date) => (
                  <Text style={styles.dayCell} key={date}>
                    {date.split('-')[2]}
                  </Text>
                ))}
              </View>
            </View>
            {tasks.map((task) => (
              <View key={task.id}>
                <View style={styles.task}>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <View style={styles.ganttChart}>
                    {renderGanttCells(task)}
                  </View>
                </View>
                {task.subTasks!.map((subTask) => (
                  <View style={styles.task} key={subTask.id}>
                    <Text style={styles.taskName}>-- {subTask.name}</Text>
                    <View style={styles.ganttChart}>
                      {renderGanttCells(subTask)}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Economica',
    backgroundColor: '#4a4747',
    color: '#ffffff',
    marginBottom: 3,
  },
  logo: {
    height: 80,
    width: 100,
    backgroundColor: '#ffffff',
  },
  task: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  taskName: {
    width: '30%',
    padding: 5,
    backgroundColor: '#4a4747',
    border: '1px solid #ccc',
    fontFamily: 'Economica',
    color: '#ffffff',
    fontSize: 10,
  },
  ganttChart: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  dayCell: {
    flex: 1,
    height: '100%',
    border: '1px solid #ccc',
    textAlign: 'center',
    fontFamily: 'Economica',
    justifyContent: 'center',
  },
  filledDayCell: {
    backgroundColor: '#5f81db',
    color: '#fff',
    flex: 1,
    height: '100%',
    border: '1px solid #ccc',
    textAlign: 'center',
    fontFamily: 'Economica',
    justifyContent: 'center',
  },
});

export default WorkOrderPDF;
