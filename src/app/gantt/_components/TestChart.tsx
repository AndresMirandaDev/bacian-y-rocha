'use client';
import Spinner from '@/app/components/Spinner';
import { SubTask, WorkOrder } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { Task as Activity } from '@prisma/client';
import { addDays } from 'date-fns';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { ViewSwitcher } from './ViewSwither';

interface Props {
  workOrder: WorkOrder;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}

const prepareData = (activities: Activity[]) => {
  let data: any[] = [];
  activities.forEach((a, index) => {
    data.push({
      start: new Date(a.startDate),
      end: addDays(a.startDate, a.durationInDays),
      name: a.name,
      id: a.id,
      type: 'project',
      progress: a.progress,
      isDisabled: true,
      hideChildren: true,
      styles: {
        progressColor: '#ffbb54',
        progressSelectedColor: '#ff9e0d',
      },
      assignation: a.assignedTo,
    });
    a.subTasks.forEach((st) => {
      data.push({
        start: new Date(st.startDate),
        end: addDays(st.startDate, a.durationInDays),
        name: st.name,
        id: st.id,
        type: 'task',
        progress: st.progress,
        isDisabled: true,
        hideChildren: false,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        assignation: st.assignedTo,
        dependencies: [a.id],
      });
    });
  });
  return data;
};

const TestChart = ({ workOrder }: Props) => {
  const [tasks, setTasks] = useState<any>();
  const [isChecked, setIsChecked] = React.useState(true);
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  useEffect(() => {
    const data = prepareData(workOrder.activities);
    setTasks(data);
  }, [workOrder]);

  const handleTaskChange = (task: Task) => {
    console.log('On date change Id:' + task.id);
    let newTasks = tasks.map((t: any) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t: any) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t: any) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?');
    if (conf) {
      setTasks(tasks.filter((t: any) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t: any) => (t.id === task.id ? task : t)));
    console.log('On progress change Id:' + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert('On Double Click event Id:' + task.id);
  };

  const handleClick = (task: Task) => {
    console.log('On Click event Id:' + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t: any) => (t.id === task.id ? task : t)));
    console.log('On expander click Id:' + task.id);
  };
  if (!tasks) return <div>loading</div>;

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        viewMode={view}
        tasks={tasks}
        locale="es"
        todayColor="rgba(208,57,34,0.5858718487394958)"
        projectBackgroundColor="rgba(34,78,208,0.5858718487394958)"
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        columnWidth={columnWidth}
        listCellWidth={isChecked ? '155px' : ''}
        TooltipContent={({ task }: any) => {
          return (
            <Card>
              <Flex direction="column">
                <Flex gap="3">
                  <Text className="text-slate-500">Nombre actividad:</Text>
                  <Text className="font-semibold capitalize">{task.name}</Text>
                </Flex>
                <Flex gap="3">
                  <Text className="text-slate-500">Fecha inicio:</Text>
                  <Text className="font-semibold">
                    {task.start.toLocaleDateString()}
                  </Text>
                </Flex>
                <Flex gap="3">
                  <Text className="text-slate-500">Fecha término:</Text>
                  <Text className="font-semibold">
                    {task.end.toLocaleDateString()}
                  </Text>
                </Flex>
                <Flex gap="3">
                  <Text className="text-slate-500">Progreso:</Text>
                  <Text className="font-semibold">{task.progress}%</Text>
                </Flex>
                <Flex gap="3">
                  <Text className="text-slate-500">Asignado a:</Text>
                  <Text className="font-semibold">{task.assignation}</Text>
                </Flex>
              </Flex>
            </Card>
          );
        }}
      />
    </div>
  );
};

export default TestChart;
