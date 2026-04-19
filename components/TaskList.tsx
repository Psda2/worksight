'use client';
import * as React from 'react';
import { Box, Typography, Button, TextField, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createTask, getTasksByProject } from '@/app/projects/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TaskList({ projectId, workers }: { projectId: string, workers: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', requiredHours: 0, assignedWorkers: [] as string[] });

  React.useEffect(() => {
    getTasksByProject(projectId).then(setTasks);
  }, [projectId]);

  const handleCreate = async () => {
    await createTask({ ...formData, projectId });
    setOpen(false);
    setFormData({ name: '', requiredHours: 0, assignedWorkers: [] });
    getTasksByProject(projectId).then(setTasks);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h6" color="primary.dark">Phase / Task Assignments</Typography>
        <Button size="small" variant="outlined" onClick={() => setOpen(true)}>+ Add Task</Button>
      </Box>

      {tasks.length === 0 ? <Typography color="text.secondary">No tasks assigned yet.</Typography> : (
        <Stack spacing={2}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {tasks.map((t: any) => (
            <Box key={t._id} sx={{ p: 2, bgcolor: 'white', borderRadius: 2, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontWeight: 600 }} variant="subtitle1">{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">Required Hours: {t.requiredHours}</Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(t.assignedWorkers || []).map((w: any) => (
                    <Chip key={w._id} label={`${w.name} (${w.role})`} size="small" color="primary" variant="outlined" sx={{ bgcolor: 'primary.50' }} />
                  ))}
                  {(!t.assignedWorkers || t.assignedWorkers.length === 0) && <Chip label="Unassigned" size="small" color="error" variant="outlined" />}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Assign New Task</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1, minWidth: 400 }}>
            <TextField label="Task Name" fullWidth value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <TextField label="Required Hours" type="number" fullWidth value={formData.requiredHours} onChange={(e) => setFormData({...formData, requiredHours: Number(e.target.value)})} />
            
            <FormControl fullWidth>
              <InputLabel>Assign Workers</InputLabel>
              <Select
                multiple
                value={formData.assignedWorkers}
                onChange={(e) => setFormData({...formData, assignedWorkers: e.target.value as string[]})}
                label="Assign Workers"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const w = workers.find(work => work._id === value);
                      return <Chip key={value} label={w?.name || value} size="small" />;
                    })}
                  </Box>
                )}
              >
                {workers.map((w) => (
                  <MenuItem key={w._id} value={w._id}>{w.name} - {w.role}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate} disabled={!formData.name}>Allocate</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
