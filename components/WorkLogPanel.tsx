'use client';
import * as React from 'react';
import { Box, Typography, Button, TextField, Stack, Card, CardContent, Divider, Snackbar, Alert } from '@mui/material';
import { logWork } from '@/app/tracking/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorkLogPanel({ activeTasks }: { activeTasks: any[] }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = React.useState<Record<string, Record<string, string>>>({});
  const [success, setSuccess] = React.useState(false);

  const handleHourChange = (taskId: string, workerId: string, val: string) => {
    setHours(prev => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        [workerId]: val
      }
    }));
  };

  const handleSubmit = async (taskId: string) => {
    const taskHours = hours[taskId];
    if (!taskHours) return;
    
    const logs = Object.entries(taskHours)
      .filter(([, hrs]) => hrs !== '' && Number(hrs) > 0)
      .map(([wId, hrs]) => ({ workerId: wId, hours: Number(hrs) }));

    if (logs.length === 0) return;

    await logWork({ taskId, date: selectedDate, logs });
    
    setHours(prev => {
      const copy = { ...prev };
      delete copy[taskId];
      return copy;
    });
    setSuccess(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" color="text.secondary">Entry Date:</Typography>
        <TextField 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
          size="small"
        />
      </Box>

      {activeTasks.length === 0 ? <Typography>No active tasks available to log hours.</Typography> : (
        <Stack spacing={3}>
          {activeTasks.map(task => (
            <Card key={task._id} sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', border: '1px solid #E2E8F0' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.dark">{task.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Planned Target: {task.requiredHours} Hours
                </Typography>

                {(!task.assignedWorkers || task.assignedWorkers.length === 0) ? (
                  <Typography variant="subtitle2" color="error">No workers assigned to this task yet.</Typography>
                ) : (
                  <Stack spacing={2} divider={<Divider />}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {task.assignedWorkers.map((w: any) => (
                      <Box key={w._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 500 }}>{w.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{w.role}</Typography>
                        </Box>
                        <TextField 
                          label="Hours Worked Today" 
                          type="number" 
                          size="small"
                          sx={{ width: 160 }}
                          slotProps={{ htmlInput: { min: 0, max: 24, step: 0.5 } }}
                          value={hours[task._id]?.[w._id] || ''}
                          onChange={(e) => handleHourChange(task._id, w._id, e.target.value)}
                        />
                      </Box>
                    ))}
                    <Box sx={{ pt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        color="secondary"
                        disabled={!hours[task._id] || Object.values(hours[task._id]).every(v => v === '' || Number(v) <= 0)}
                        onClick={() => handleSubmit(task._id)}
                      >
                        Submit Daily Log
                      </Button>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%', bgcolor: 'success.main', color: 'white' }}>Work logs submitted successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
