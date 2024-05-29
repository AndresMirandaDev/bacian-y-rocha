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
import { addDays, eachDayOfInterval, max, min } from 'date-fns';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Text,
} from '@radix-ui/themes';
import { ViewSwitcher } from './ViewSwither';
import { updateSaleOrderSchema } from '@/app/api/saleorders/validationSchema';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import LoadingPAge from '@/app/loading';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaFilePdf } from 'react-icons/fa6';
import Link from 'next/link';
import ExportPDFButton from '@/app/ot/workorderpdf/ExportPDFButton';

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
    const maxProgress = a.subTasks.length * 100;
    const actualProgress = a.subTasks.reduce((acc, st) => {
      return acc + st.progress;
    }, 0);
    data.push({
      start: new Date(a.startDate),
      end: addDays(a.startDate, a.durationInDays - 1),
      name: a.name,
      id: a.id,
      type: 'project',
      progress: (actualProgress * 100) / maxProgress,
      isDisabled: true,
      hideChildren: false,

      styles: {
        progressColor: '#ffbb54',
        progressSelectedColor: '#ff9e0d',
      },
      assignation: a.assignedTo,
    });
    a.subTasks.forEach((st) => {
      data.push({
        start: new Date(st.startDate),
        end: addDays(st.startDate, st.durationInDays - 1),
        name: st.name,
        id: st.id,
        type: 'task',
        progress: st.progress,
        isDisabled: true,
        hideChildren: false,

        styles: {
          progressColor: 'rgba(78,208,34,0.7903536414565826)',
          progressSelectedColor: '#4ed022',
        },
        assignation: st.assignedTo,
        dependencies: [a.id],
        project: a.id,
      });
    });
  });
  return data;
};

const TestChart = ({ workOrder }: Props) => {
  const [tasks, setTasks] = useState<any>();
  const [isChecked, setIsChecked] = React.useState(true);
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [activities, setActivities] = useState<Activity[]>();

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
    setActivities(workOrder.activities);
  }, [workOrder]);

  const handleTaskChange = (task: Task) => {
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

    const filteredActivity = activities?.filter((a) => {
      return a.id === task.project;
    });
    if (filteredActivity) {
      // const duration = eachDayOfInterval({ start: task.start, end: task.end });
      const updatedActivity = filteredActivity[0];
      const filteredSubtask = updatedActivity.subTasks.filter((st) => {
        return st.id === task.id;
      });
      if (filteredSubtask) {
        const subTaskDuration = eachDayOfInterval({
          start: task.start,
          end: task.end,
        });
        filteredSubtask[0].startDate = task.start.toISOString();
        filteredSubtask[0].durationInDays = subTaskDuration.length;
      }
    }
    if (filteredActivity) {
      let subtasksStartDates: any[] = [];
      let subTasksEndDates: any[] = [];
      filteredActivity[0].subTasks.map((st: any) => {
        subtasksStartDates.push(st.startDate);
      });
      newTasks.map((t: any) => {
        subTasksEndDates.push(t.end);
      });
      filteredActivity[0].startDate = min(subtasksStartDates);

      const newDuration = eachDayOfInterval({
        start: min(subtasksStartDates),
        end: max(subTasksEndDates),
      });
      filteredActivity[0].durationInDays = newDuration.length;
      const index = activities?.findIndex(
        (a) => a.id === filteredActivity[0].id
      );
      if (index) {
        const updatedActivities = [...activities!];
        updatedActivities[index].durationInDays =
          filteredActivity[0].durationInDays;
        updatedActivities[index].startDate = filteredActivity[0].startDate;
        setActivities(updatedActivities);
      }
    }
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t: any) => (t.id === task.id ? task : t)));

    const updatedActivities = [...activities!];

    const filteredActivity = activities?.filter((a) => {
      return a.id === task.project;
    })[0];

    const filteredSubTask = filteredActivity?.subTasks.filter(
      (st) => st.id === task.id
    )[0];

    const activityIndex = activities?.findIndex(
      (a) => a.id === filteredActivity?.id
    );

    const subTaskIndex = filteredActivity?.subTasks.findIndex(
      (st) => st.id === filteredSubTask?.id
    );
    updatedActivities[activityIndex!].subTasks[subTaskIndex!].progress =
      task.progress;

    setActivities(updatedActivities);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t: any) => (t.id === task.id ? task : t)));
    console.log('On expander click Id:' + task.id);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`/api/workorders/${workOrder.id}`, {
        activities,
      });
      toast.success('Cambios guardados');
    } catch (error) {
      console.log(error);
      toast.error('No se pudieron guardar los cambios');
    }
  };

  const handleSubTaskChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskIndex: number,
    subTaskIndex: number,
    field: keyof SubTask
  ) => {
    const updatedTasks = activities?.map((task: any, index: number) => {
      if (index === taskIndex) {
        const updatedSubTasks = task.subTasks?.map(
          (subTask: any, sIndex: number) => {
            if (sIndex === subTaskIndex) {
              if (field === 'progress') {
                return { ...subTask, [field]: parseInt(e.target.value) };
              } else {
                return { ...subTask, [field]: e.target.value };
              }
            }
            return subTask;
          }
        );
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });

    setActivities(updatedTasks);
  };

  if (!tasks) return <LoadingPAge />;

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Flex className="mt-5 mb-5">
        <Button onClick={handleSaveChanges}>
          <FaSave /> Guardar cambios
        </Button>
      </Flex>
      <Flex className="mt-5 mb-5">
        <Button>
          <ExportPDFButton workOrder={workOrder} />
        </Button>
      </Flex>
      <Gantt
        viewMode={view}
        tasks={tasks}
        locale="es"
        todayColor="rgba(208,57,34,0.5858718487394958)"
        projectBackgroundColor="rgba(34,78,208,0.5858718487394958)"
        onDateChange={handleTaskChange}
        onProgressChange={handleProgressChange}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        columnWidth={columnWidth}
        listCellWidth={isChecked ? '155px' : ''}
        TaskListHeader={() => {
          return (
            <Grid
              columns="3"
              className="bg-slate-500 p-2 rounded-md text-slate-100"
            >
              <Box>
                <Text>Nombre</Text>
              </Box>
              <Box>
                <Text>Inicio</Text>
              </Box>
              <Box>
                <Text>Término</Text>
              </Box>
            </Grid>
          );
        }}
        TooltipContent={({ task }: any) => {
          return (
            <>
              <Card className="absolute ">
                <Flex direction="column">
                  <Flex gap="3">
                    <Text className="text-slate-500">Nombre actividad:</Text>
                    <Text className="font-semibold capitalize">
                      {task.name}
                    </Text>
                  </Flex>
                  <Separator size="4" />
                  <Flex gap="3">
                    <Text className="text-slate-500">Fecha inicio:</Text>
                    <Text className="font-semibold">
                      {task.start.toLocaleDateString()}
                    </Text>
                  </Flex>
                  <Separator size="4" />
                  <Flex gap="3">
                    <Text className="text-slate-500">Fecha término:</Text>
                    <Text className="font-semibold">
                      {task.end.toLocaleDateString()}
                    </Text>
                  </Flex>
                  <Separator size="4" />
                  <Flex gap="3">
                    <Text className="text-slate-500">Progreso:</Text>
                    <Text className="font-semibold">{task.progress}%</Text>
                  </Flex>
                  <Separator size="4" />
                  <Flex gap="3">
                    <Text className="text-slate-500">Asignado a:</Text>
                    <Text className="font-semibold">{task.assignation}</Text>
                  </Flex>
                </Flex>
              </Card>
            </>
          );
        }}
      />
      <Flex className="mt-5">
        <Box>
          <Text className="text-xl p-3">Actualizar Progresos</Text>
        </Box>
      </Flex>
      <Grid className="w-full mt-5">
        {activities?.map((a, index) => {
          return (
            <Accordion.Root collapsible type="single" key={a.id}>
              <Accordion.Item value={a.id}>
                <Accordion.Header>
                  <Flex className="bg-slate-500 p-2" justify="between">
                    <Box className="capitalize text-slate-100 font-semibold">
                      {a.name}
                    </Box>
                    <Accordion.Trigger>
                      <Box className="text-white">
                        <ChevronDownIcon />
                      </Box>
                    </Accordion.Trigger>
                  </Flex>
                </Accordion.Header>
                <Accordion.Content className="bg-slate-100 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                  <Grid columns="2" className="p-2 bg-slate-200">
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Nombre
                      </Text>
                    </Box>
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Progreso
                      </Text>
                    </Box>
                  </Grid>
                  {a.subTasks.map((st, subIndex) => {
                    return (
                      <Grid key={st.id} columns="2" className="p-2">
                        <Box>
                          <Text className="capitalize">{st.name}</Text>
                        </Box>
                        <Box>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={st.progress}
                            onChange={(e) =>
                              handleSubTaskChange(
                                e,
                                index,
                                subIndex,
                                'progress'
                              )
                            }
                            className="range range-info range-xs"
                          />
                          <span className="flex justify-between text-xs px-2">
                            {`${st.progress}%`}
                          </span>
                        </Box>
                      </Grid>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          );
        })}
      </Grid>
    </div>
  );
};

export default TestChart;
