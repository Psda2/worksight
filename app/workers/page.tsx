import { Box, Typography } from '@mui/material';
import { getWorkers } from './actions';
import WorkerList from '@/components/WorkerList';

export const dynamic = 'force-dynamic';

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Worker Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your labor force, view skills, and assign to teams.
        </Typography>
      </Box>
      <WorkerList initialWorkers={workers} />
    </Box>
  );
}
