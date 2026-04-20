import { Box } from '@mui/material';
import { getProjects } from './actions';
import { getWorkers } from '@/app/workers/actions';
import ProjectList from '@/components/ProjectList';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const workers = await getWorkers();

  return (
    <Box>
      <ProjectList initialProjects={projects} workers={workers} />
    </Box>
  );
}
