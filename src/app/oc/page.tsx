import { Box, Container } from '@radix-ui/themes';
import GanttChart from '../components/ganttChart/GantChart';
import prisma from '../../../prisma/client';

const OCPage = async () => {
  const tasks = await prisma.task.findMany();
  return (
    <Box>
      <GanttChart tasks={tasks} />
    </Box>
  );
};

export default OCPage;
