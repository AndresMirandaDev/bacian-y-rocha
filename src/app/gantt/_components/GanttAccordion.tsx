import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Flex, Box, Text, Separator } from '@radix-ui/themes';
import { eachDayOfInterval } from 'date-fns';
import React from 'react';

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
  task: Task;
  subTask?: boolean;
  handleSubTaskChange: CallableFunction;
  index: number;
  workOrderStartDate: Date;
}

const GanttAccordion = ({
  task,
  handleSubTaskChange,
  index,
  workOrderStartDate,
}: Props) => {
  const daysBetween = eachDayOfInterval({
    start: workOrderStartDate,
    end: new Date(task.startDate),
  });

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value={task.id}>
        <Accordion.Header>
          <Flex className="w-full  text-slate-100" key={task.id}>
            <Flex className=" w-1/2 bg-slate-500 p-1" align="center">
              <Box className="hover:scale-110 hover:bg-slate-400 hover:text-slate-100 rounded-full transition-all duration-700">
                <Accordion.Trigger>
                  <Box>
                    <ChevronDownIcon />
                  </Box>
                </Accordion.Trigger>
              </Box>
              <Box className="w-full text-center">
                <Text>{task.name}</Text>
              </Box>
              <Box className="w-full text-center">
                <Text>{task.assignedTo}</Text>
              </Box>
              <Box className="w-full text-center">
                <Text>{task.progress}%</Text>
              </Box>
              <Box className="w-full text-center">
                <Text>{task.startDate}</Text>
              </Box>
              <Box className="w-full  text-center">
                <Text>{task.durationInDays}</Text>
              </Box>
            </Flex>
            <Flex className="bg-blue-200 w-1/2" align="center">
              <progress
                className="progress progress-info rounded-sm"
                style={{
                  width: 100 * task.durationInDays,
                  marginLeft: daysBetween.length * 100 - 100,
                }}
                value={task.progress}
                max={100}
              ></progress>
            </Flex>
          </Flex>
          <Separator size="4" />
        </Accordion.Header>
        <Accordion.Content className=" data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
          {task.subTasks &&
            task.subTasks.map((subTask, subIndex) => {
              const calculateMargin = eachDayOfInterval({
                start: workOrderStartDate,
                end: new Date(subTask.startDate),
              });

              return (
                <React.Fragment key={subTask.id}>
                  <Flex className="w-full  text-slate-600" key={task.id}>
                    <Flex className=" w-1/2 bg-slate-100 p-1" align="center">
                      <Box className="w-full text-center">
                        <Text>{subTask.name}</Text>
                      </Box>
                      <Box className="w-full text-center">
                        <Text>{subTask.assignedTo}</Text>
                      </Box>
                      <Box className="w-full text-center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={subTask.progress}
                          onChange={(e) =>
                            handleSubTaskChange(e, index, subIndex, 'progress')
                          }
                          className="range range-info range-xs"
                        />
                        <Text>{subTask.progress}%</Text>
                      </Box>
                      <Box className="w-full text-center">
                        <Text>{subTask.startDate}</Text>
                      </Box>
                      <Box className="w-full  text-center">
                        <Text>{subTask.durationInDays}</Text>
                      </Box>
                    </Flex>
                    <Flex className="bg-blue-100 w-1/2" align="center" gap="1">
                      <progress
                        className="progress progress-info rounded-sm"
                        style={{
                          width: 100 * subTask.durationInDays,
                          marginLeft: calculateMargin.length * 100 - 100,
                        }}
                        value={subTask.progress}
                        max={100}
                      ></progress>
                      <Text>{subTask.progress}%</Text>
                    </Flex>
                  </Flex>
                  <Separator size="4" />
                </React.Fragment>
              );
            })}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default GanttAccordion;
