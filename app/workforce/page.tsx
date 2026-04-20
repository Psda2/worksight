import { Box, Typography, Avatar, Chip } from '@mui/material';
import { getWorkerStatus } from './actions';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
export const dynamic = 'force-dynamic';

const ROLE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Team Leader': { bg: '#EDE9FE', text: '#6D28D9', border: '#C4B5FD' },
  'Supervisor':  { bg: '#DBEAFE', text: '#1D4ED8', border: '#BFDBFE' },
  'Worker':      { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
  'Assistant':   { bg: '#FDF4FF', text: '#7E22CE', border: '#E9D5FF' },
};

const AVATAR_COLORS: Record<string, string> = {
  'Team Leader': 'linear-gradient(135deg,#7C3AED,#4F46E5)',
  'Supervisor':  'linear-gradient(135deg,#0EA5E9,#0369A1)',
  'Worker':      'linear-gradient(135deg,#10B981,#059669)',
  'Assistant':   'linear-gradient(135deg,#F59E0B,#D97706)',
};

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WorkerCard({ w }: { w: any }) {
  const rc = ROLE_COLORS[w.role] || ROLE_COLORS['Worker'];
  const avatarGradient = AVATAR_COLORS[w.role] || AVATAR_COLORS['Worker'];
  return (
    <Box sx={{
      p: 2.5, bgcolor: '#fff',
      border: `1px solid ${w.isBusy ? '#FDE68A' : '#EEF0F8'}`,
      borderRadius: '14px',
      borderTop: `3px solid ${w.isBusy ? '#F59E0B' : '#10B981'}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.2s',
      '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.08)', transform: 'translateY(-1px)' },
      display: 'flex', flexDirection: 'column', gap: 1.5,
    }}>
      {/* Top row: avatar + name + role */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{
          width: 44, height: 44, borderRadius: '12px',
          background: avatarGradient,
          fontSize: '0.9rem', fontWeight: 700, flexShrink: 0,
        }}>
          {getInitials(w.name)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#1E1B4B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {w.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.4, flexWrap: 'wrap' }}>
            <Chip
              label={w.role}
              size="small"
              sx={{ bgcolor: rc.bg, color: rc.text, border: `1px solid ${rc.border}`, height: 18, fontSize: '0.68rem', fontWeight: 600 }}
            />
            {w.isEarlyFinisher && (
              <Chip
                icon={<StarRoundedIcon sx={{ fontSize: '0.75rem !important', color: '#D97706 !important' }} />}
                label="Rewarded"
                size="small"
                sx={{ bgcolor: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', height: 18, fontSize: '0.68rem', fontWeight: 600 }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Status row */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, pt: 1, borderTop: '1px solid #F8F7FF' }}>
        <Box sx={{
          width: 8, height: 8, mt: 0.5, borderRadius: '50%', flexShrink: 0,
          bgcolor: w.isBusy ? '#F59E0B' : '#10B981',
          boxShadow: w.isBusy ? '0 0 6px rgba(245,158,11,0.5)' : '0 0 6px rgba(16,185,129,0.5)',
        }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {w.isBusy
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? w.currentTasks.map((t: any, i: number) => (
              <Typography key={i} sx={{ fontSize: '0.78rem', color: '#78716C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.taskName}
              </Typography>
            ))
            : <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#10B981' }}>Available for assignment</Typography>
          }
        </Box>
      </Box>
    </Box>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Section({ title, subtitle, accent, items, icon }: { title: string; subtitle: string; accent: string; items: any[]; icon: React.ReactNode }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1E1B4B' }}>{title}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8' }}>{subtitle}</Typography>
        </Box>
        <Box sx={{ px: 2, py: 0.5, bgcolor: accent, borderRadius: '20px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{items.length}</Typography>
        </Box>
      </Box>

      {items.length === 0
        ? (
          <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#fff', borderRadius: '14px', border: '1px dashed #E2E8F0' }}>
            <Typography variant="body2" color="text.secondary">None at this time.</Typography>
          </Box>
        )
        : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr' }, gap: 2 }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((w: any) => <WorkerCard key={w._id} w={w} />)}
          </Box>
        )
      }
    </Box>
  );
}

export default async function WorkforcePage() {
  const workers = await getWorkerStatus();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const free = workers.filter((w: any) => !w.isBusy);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const busy = workers.filter((w: any) => w.isBusy);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rewarded = workers.filter((w: any) => w.isEarlyFinisher);

  const stats = [
    {
      label: 'Total Workers',
      value: workers.length,
      gradient: 'linear-gradient(135deg,#7C3AED,#4F46E5)',
      icon: <GroupsRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      light: '#EDE9FE',
      textColor: '#6D28D9',
      note: 'All registered workers',
    },
    {
      label: 'Available',
      value: free.length,
      gradient: 'linear-gradient(135deg,#10B981,#059669)',
      icon: <CheckCircleRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      light: '#D1FAE5',
      textColor: '#059669',
      note: 'Ready for assignment',
    },
    {
      label: 'Deployed',
      value: busy.length,
      gradient: 'linear-gradient(135deg,#F59E0B,#D97706)',
      icon: <BuildRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      light: '#FEF3C7',
      textColor: '#D97706',
      note: 'Currently on active tasks',
    },
    {
      label: 'Rewarded',
      value: rewarded.length,
      gradient: 'linear-gradient(135deg,#EC4899,#DB2777)',
      icon: <StarRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      light: '#FCE7F3',
      textColor: '#DB2777',
      note: 'Early task completions',
    },
  ];

  return (
    <Box>


      {/* Stat cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
        {stats.map(s => (
          <Box key={s.label} sx={{
            p: 2.5, bgcolor: '#fff', borderRadius: '16px',
            border: '1px solid #EEF0F8',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex', gap: 2, alignItems: 'center',
            transition: 'all 0.2s',
            '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' },
          }}>
            <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              {s.icon}
            </Box>
            <Box>
              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1E1B4B', lineHeight: 1 }}>{s.value}</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: s.textColor, mt: 0.3 }}>{s.label}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#A0AEC0', mt: 0.2 }}>{s.note}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Two sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Section
          title="Available — Ready for Assignment"
          subtitle={`${free.length} worker${free.length !== 1 ? 's' : ''} waiting to be deployed`}
          accent="#10B981"
          items={free}
          icon={<CheckCircleRoundedIcon />}
        />
        <Section
          title="Deployed — On Active Tasks"
          subtitle={`${busy.length} worker${busy.length !== 1 ? 's' : ''} currently engaged`}
          accent="#F59E0B"
          items={busy}
          icon={<BuildRoundedIcon />}
        />
      </Box>
    </Box>
  );
}
