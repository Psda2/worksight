import { Box } from '@mui/material';
import { getActiveTasks } from './actions';
import WorkLogPanel from '@/components/WorkLogPanel';

export const dynamic = 'force-dynamic';

export default async function TrackingPage() {
  const tasks = await getActiveTasks();

  return (
    <Box>
      <WorkLogPanel activeTasks={tasks} />
    </Box>
  );
}
