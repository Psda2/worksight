import { Box, Typography } from '@mui/material';
import { getActiveTasks } from './actions';
import WorkLogPanel from '@/components/WorkLogPanel';

export const dynamic = 'force-dynamic';

export default async function TrackingPage() {
  const tasks = await getActiveTasks();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Daily Work Tracking
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Log actual daily hours for assigned workers on active tasks.
        </Typography>
      </Box>
      <WorkLogPanel activeTasks={tasks} />
    </Box>
  );
}
