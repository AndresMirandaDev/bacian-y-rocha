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

const GanntActivityAccordion = ({
  task,
  handleSubTaskChange,
  index,
}: Props) => {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value={task.id}>
        <Accordion.Header>
          <Flex
            gap="5"
            className="bg-slate-600 text-white rounded-sm p-3 hover:scale-[1.02] transition-all duration-700 hover:shadow-xl"
            direction={{
              initial: 'column',
              xs: 'column',
              sm: 'column',
              md: 'column',
              lg: 'row',
              xl: 'row',
            }}
          >
            <Flex
              direction="column"
              justify="center"
              align={{
                initial: 'start',
                xs: 'start',
                sm: 'start',
                md: 'start',
                lg: 'center',
                xl: 'center',
              }}
            >
              <Box>
                <Text className="font-semibold text-slate-100">
                  Nombre actividad
                </Text>
              </Box>
              <Box>
                <Text>{task.name}</Text>
              </Box>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align={{
                initial: 'start',
                xs: 'start',
                sm: 'start',
                md: 'start',
                lg: 'center',
                xl: 'center',
              }}
            >
              <Box>
                <Text className="font-semibold text-slate-100">Encargado</Text>
              </Box>
              <Box>
                <Text>{task.assignedTo}</Text>
              </Box>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align={{
                initial: 'start',
                xs: 'start',
                sm: 'start',
                md: 'start',
                lg: 'center',
                xl: 'center',
              }}
            >
              <Box>
                <Text className="font-semibold text-slate-100">Progreso</Text>
              </Box>
              <Flex
                align={{
                  initial: 'start',
                  xs: 'start',
                  sm: 'start',
                  md: 'start',
                  lg: 'center',
                  xl: 'center',
                }}
                gap="1"
              >
                <progress
                  className="progress w-full progress-info bg-slate-300"
                  value={task.progress}
                  max="100"
                ></progress>
                <span>{task.progress}%</span>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align={{
                initial: 'start',
                xs: 'start',
                sm: 'start',
                md: 'start',
                lg: 'center',
                xl: 'center',
              }}
            >
              <Box>
                <Text className="font-semibold text-slate-100">
                  Fecha de inicio
                </Text>
              </Box>
              <Box>
                <Text>{task.startDate}</Text>
              </Box>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align={{
                initial: 'start',
                xs: 'start',
                sm: 'start',
                md: 'start',
                lg: 'center',
                xl: 'center',
              }}
            >
              <Box>
                <Text className="font-semibold text-slate-100">
                  Duración en días
                </Text>
              </Box>
              <Box>
                <Text>{task.durationInDays}</Text>
              </Box>
            </Flex>
            <Flex>
              <Accordion.Trigger>
                <Box className="text-white">
                  <ChevronDownIcon />
                </Box>
              </Accordion.Trigger>
            </Flex>
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
              //   <div
              //     key={subTask.id}
              //     className="grid grid-cols-6 gap-2 mb-2 pl-4 bg-gray-100 items-center"
              //   >
              //     <div>{subTask.name}</div>

              //     <div>{subTask.assignedTo}</div>
              //     {/* Input de rango para ajustar el progreso */}
              //     <div className="col-span-1">
              //       <input
              //         type="range"
              //         min="0"
              //         max="100"
              //         value={subTask.progress}
              //         onChange={(e) =>
              //           handleSubTaskChange(e, index, subIndex, 'progress')
              //         }
              //         className="w-full range range-primary"
              //       />
              //       <span className="flex justify-between text-xs px-2">
              //         {`${subTask.progress}%`}
              //       </span>
              //     </div>
              //     <div>{subTask.startDate}</div>
              //     <div>{subTask.durationInDays}</div>
              //   </div>
            ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default GanntActivityAccordion;
