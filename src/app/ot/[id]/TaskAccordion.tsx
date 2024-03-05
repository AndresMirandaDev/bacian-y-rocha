'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes';
import GalleryModal from '../_components/GalleryModal';

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
}

interface Props {
  activity: Task;
  subTask?: boolean;
}

const TaskAccordion = ({ activity, subTask }: Props) => {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value={activity.id}>
        <Accordion.Header className="flex-col justify-center rounded-md ">
          <Accordion.Trigger
            className="flex items-center w-full justify-center p-2"
            style={{ backgroundColor: subTask ? '#669BBC' : '#778DA9' }}
          >
            <Text className="text-xl text-slate-100 font-bold capitalize">
              {activity.name}
            </Text>
            <Box className="text-white">
              <ChevronDownIcon />
            </Box>
          </Accordion.Trigger>
          <Separator size="4" />
        </Accordion.Header>
        <Accordion.Content className="rounded-md data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
          <Grid
            columns={{
              initial: '1',
              xs: '1',
              sm: '1',
              md: '1',
              lg: '1',
              xl: '1',
            }}
            className="p-3"
          >
            <Flex direction="column" justify="center" align="center" gap="3">
              <Box>
                <Text className="font-bold">Descripción de actividad</Text>
              </Box>
              <Box>
                <Text>{activity.description}</Text>
              </Box>
              <Separator size="4" />
            </Flex>
            <Flex direction="column" justify="center" align="center" gap="3">
              <Box>
                <Text className="font-bold">Encargado</Text>
              </Box>
              <Box>
                <Text>{activity.assignedTo}</Text>
              </Box>
              <Separator size="4" />
            </Flex>
            <Flex direction="column" justify="center" align="center" gap="3">
              <Box>
                <Text className="font-bold">Fecha de inicio</Text>
              </Box>
              <Box>
                <Text>{activity.startDate}</Text>
              </Box>
              <Separator size="4" />
            </Flex>
            <Flex direction="column" justify="center" align="center" gap="3">
              <Box>
                <Text className="font-bold">Duracion en días</Text>
              </Box>
              <Box>
                <Text>{activity.durationInDays}</Text>
              </Box>
              <Separator size="4" />
            </Flex>
            {!subTask && activity.photos && (
              <Flex>
                <GalleryModal
                  photos={activity.photos}
                  description="Galeria de fotos de actividad"
                  title="Galeria de fotos"
                />
              </Flex>
            )}
            {subTask && (
              <Flex direction="column" justify="center" align="center" gap="3">
                <Box>
                  <Text className="font-bold">H.H</Text>
                </Box>
                <Box>
                  <Text>{activity.hours}</Text>
                </Box>
                <Separator size="4" />
              </Flex>
            )}
            {subTask && (
              <Flex direction="column" justify="center" align="center" gap="3">
                <Box>
                  <Text className="font-bold">Valor H.H</Text>
                </Box>
                <Box>
                  <Text>$ {activity.hourPrice}</Text>
                </Box>
                <Separator size="4" />
              </Flex>
            )}
          </Grid>
          {activity.subTasks && (
            <Flex direction="column" className="p-5">
              <Box className="flex mb-5 justify-center">
                <Text className="font-bold">Sub tareas</Text>
              </Box>
              {activity.subTasks?.map((st) => {
                return <TaskAccordion key={st.id} activity={st} subTask />;
              })}
            </Flex>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default TaskAccordion;
