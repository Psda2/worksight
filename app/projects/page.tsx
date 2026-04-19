import { Box, Typography } from '@mui/material';
import { getProjects } from './actions';
import { getWorkers } from '@/app/workers/actions';
import ProjectList from '@/components/ProjectList';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const workers = await getWorkers();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Projects & Tasks
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Define projects, break down assignments, and allocate your labor force.
        </Typography>
      </Box>
      <ProjectList initialProjects={projects} workers={workers} />
    </Box>
  );
}
