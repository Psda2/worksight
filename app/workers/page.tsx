import { Box } from '@mui/material';
import { getWorkers } from './actions';
import WorkerList from '@/components/WorkerList';

export const dynamic = 'force-dynamic';

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <Box>
      <WorkerList initialWorkers={workers} />
    </Box>
  );
}
