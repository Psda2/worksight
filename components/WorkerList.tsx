'use client';

import * as React from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Stack, MenuItem } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createWorker } from '@/app/workers/actions';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'role', headerName: 'Role', flex: 1, minWidth: 150 },
  { field: 'type', headerName: 'Type', flex: 1, minWidth: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Permanent' ? 'primary' : 'warning'} size="small" />
  )},
  { field: 'skills', headerName: 'Skills', flex: 1.5, minWidth: 200, renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {(params.value || []).map((s: string) => <Chip key={s} label={s} size="small" variant="outlined" />)}
      </Box>
  )},
  { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 120 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorkerList({ initialWorkers }: { initialWorkers: any[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', role: 'Worker', type: 'Permanent', skills: '', phone: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', role: 'Worker', type: 'Permanent', skills: '', phone: '' });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      };
      await createWorker(payload);
      handleClose();
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
         <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Add Worker</Button>
      </Box>
      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 4, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
        <DataGrid 
          rows={initialWorkers} 
          columns={columns} 
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          sx={{ 
            border: 0, 
            '& .MuiDataGrid-cell': { px: 2 },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#F8F7FF',
              color: '#1E1B4B',
              fontWeight: 700,
              borderBottom: '1px solid #EEF0F8',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              fontSize: '0.85rem',
            }
          }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Add New Worker</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Full Name" fullWidth required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <TextField select label="Role" fullWidth required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <MenuItem value="Worker">Worker</MenuItem>
              <MenuItem value="Assistant">Assistant</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Team Leader">Team Leader</MenuItem>
            </TextField>
            <TextField select label="Type" fullWidth required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <MenuItem value="Permanent">Permanent</MenuItem>
              <MenuItem value="Ad-Hoc">Ad-Hoc</MenuItem>
            </TextField>
            <TextField label="Phone Number" fullWidth value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <TextField label="Skills (comma separated)" fullWidth value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} helperText="e.g. Harvesting, Driving, Packing" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!formData.name || isLoading}>Save Worker</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
