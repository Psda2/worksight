'use client';
import * as React from 'react';
import { Box, Button, TextField, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { createProject } from '@/app/projects/actions';
import TaskList from './TaskList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectList({ initialProjects, workers }: { initialProjects: any[], workers: any[] }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', startDate: '', endDate: '' });

  const handleCreate = async () => {
    await createProject({ ...formData, startDate: new Date(formData.startDate), endDate: new Date(formData.endDate) });
    setOpen(false);
    window.location.reload();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
         <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => setOpen(true)}>New Master Project</Button>
      </Box>
      
      {initialProjects.length === 0 ? <Typography>No projects defined yet.</Typography> : null}

      {initialProjects.map((proj) => (
        <Accordion key={proj._id} sx={{ mb: 2, borderRadius: '12px !important', '&:before': { display: 'none' }, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', overflow: 'hidden' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#FFFFFF', p: 2 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{proj.name}</Typography>
              <Chip size="small" label={proj.status === 'Active' ? 'In Progress' : proj.status} color={proj.status === 'Active' ? 'success' : 'default'} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                {new Date(proj.startDate).toLocaleDateString()} - {new Date(proj.endDate).toLocaleDateString()}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#F8FAFC', p: 4, borderTop: '1px solid #E2E8F0' }}>
            <TaskList projectId={proj._id} workers={workers} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Create New Project</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Project Name" fullWidth value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Start Date" type="date" slotProps={{ inputLabel: { shrink: true } }} fullWidth value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
              <TextField label="End Date" type="date" slotProps={{ inputLabel: { shrink: true } }} fullWidth value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate} disabled={!formData.name || !formData.startDate}>Save Project</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
