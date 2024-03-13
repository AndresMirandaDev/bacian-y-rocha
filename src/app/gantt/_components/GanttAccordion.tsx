import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Flex, Box, Text, Separator } from '@radix-ui/themes';
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
}

const GanttAccordion = ({ task, handleSubTaskChange, index }: Props) => {
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
            <Flex className="bg-blue-200 w-1/2 p-3" align="center"></Flex>
          </Flex>
          <Separator size="4" />
        </Accordion.Header>
        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
          {task.subTasks &&
            task.subTasks.map((subTask, subIndex) => (
              <React.Fragment key={subTask.id}>
                <Flex
                  gap="7"
                  direction={{
                    initial: 'column',
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row',
                    xl: 'row',
                  }}
                  className="p-2 bg-slate-100"
                >
                  <Flex direction="column" align="center">
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Nombre
                      </Text>
                    </Box>
                    <Box>
                      <Text>{subTask.name}</Text>
                    </Box>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Encargado
                      </Text>
                    </Box>
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        {subTask.assignedTo}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Progreso
                      </Text>
                    </Box>
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
                    <span className="flex justify-between text-xs px-2">
                      {`${subTask.progress}%`}
                    </span>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Fecha de inicio
                      </Text>
                    </Box>
                    <Box>
                      <Text>{subTask.startDate}</Text>
                    </Box>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Box>
                      <Text className="font-semibold text-slate-600">
                        Duración en días
                      </Text>
                    </Box>
                    <Box>
                      <Text>{subTask.durationInDays}</Text>
                    </Box>
                  </Flex>
                </Flex>
                <Separator size="4" />
              </React.Fragment>
            ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default GanttAccordion;
