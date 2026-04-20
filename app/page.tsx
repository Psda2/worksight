import { Box, Typography, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { getDashboardMetrics } from './actions';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const m = await getDashboardMetrics();
  const pct = m.totalPlanned > 0 ? Math.min((m.totalActual / m.totalPlanned) * 100, 100) : 0;
  const over = m.totalPlanned > 0 && m.totalActual > m.totalPlanned;

  const kpis = [
    {
      label: 'Total Workforce',
      value: m.totalWorkers,
      gradient: 'linear-gradient(135deg,#10B981,#059669)',
      icon: <PeopleAltRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      textColor: '#059669',
      note: 'Registered workers',
    },
    {
      label: 'Active Projects',
      value: m.activeProjects,
      gradient: 'linear-gradient(135deg,#0EA5E9,#0369A1)',
      icon: <WorkRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      textColor: '#0369A1',
      note: 'In progress today',
    },
    {
      label: 'Hours Logged',
      value: m.hoursToday,
      gradient: 'linear-gradient(135deg,#7C3AED,#4F46E5)',
      icon: <TimerRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      textColor: '#6D28D9',
      note: 'Logged today',
    },
    {
      label: 'Plan Utilisation',
      value: `${pct.toFixed(1)}%`,
      gradient: over ? 'linear-gradient(135deg,#EF4444,#DC2626)' : 'linear-gradient(135deg,#F59E0B,#D97706)',
      icon: <BarChartRoundedIcon sx={{ fontSize: '1.6rem', color: '#fff' }} />,
      textColor: over ? '#DC2626' : '#D97706',
      note: over ? 'Over budget ⚠' : 'Within budget',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Hero banner */}
      <Box sx={{
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #A855F7 100%)',
        p: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(79,70,229,0.3)',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Background decoration */}
        <Box sx={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', right: 80, bottom: -60, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)' }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, mb: 0.5 }}>
            Manage your workforce<br />in one place
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', maxWidth: 380 }}>
            Real-time visibility into project deployment, labour hours, and team utilisation across all active operations.
          </Typography>
        </Box>

        <Box sx={{
          position: 'relative', zIndex: 1, flexShrink: 0,
          bgcolor: '#fff', color: '#4F46E5', px: 3, py: 1.5,
          borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 1,
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' },
        }} component="a" href="/workforce">
          <TrendingUpRoundedIcon sx={{ fontSize: '1.1rem' }} />
          View Workforce
          <ArrowForwardRoundedIcon sx={{ fontSize: '1rem' }} />
        </Box>
      </Box>

      {/* KPI row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {kpis.map(k => (
          <Box key={k.label} sx={{
            p: 2.5, bgcolor: '#fff', borderRadius: '16px',
            border: '1px solid #EEF0F8',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex', gap: 2, alignItems: 'center',
            transition: 'all 0.2s',
            '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' },
          }}>
            <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: k.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              {k.icon}
            </Box>
            <Box>
              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1E1B4B', lineHeight: 1 }}>{k.value}</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: k.textColor, mt: 0.3 }}>{k.label}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#A0AEC0', mt: 0.2 }}>{k.note}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bottom grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 2 }}>

        {/* Labour variance card */}
        <Card sx={{ borderRadius: '16px', border: '1px solid #EEF0F8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1E1B4B' }}>Planned vs Actual Labour</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8', mt: 0.3 }}>Budget utilisation overview</Typography>
              </Box>
              <Chip
                label={over ? 'Over Budget' : 'On Track'}
                size="small"
                sx={{
                  bgcolor: over ? '#FEE2E2' : '#D1FAE5',
                  color: over ? '#DC2626' : '#059669',
                  border: `1px solid ${over ? '#FCA5A5' : '#6EE7B7'}`,
                  fontWeight: 600, fontSize: '0.72rem',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography sx={{ fontSize: '0.875rem', color: '#64748B' }}>Actual logged</Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: over ? '#DC2626' : '#059669' }}>
                {m.totalActual} / {m.totalPlanned} hrs &nbsp;({pct.toFixed(1)}%)
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={pct}
              color={over ? 'error' : 'success'}
              sx={{ height: 10, borderRadius: 5, bgcolor: '#F1F5F9', mb: 1.5, '& .MuiLinearProgress-bar': { borderRadius: 5 } }}
            />
            <Typography sx={{ fontSize: '0.78rem', color: '#94A3B8' }}>
              {over
                ? `⚠ ${m.totalActual - m.totalPlanned} hrs over budget`
                : `${m.totalPlanned - m.totalActual} hrs remaining buffer`
              }
            </Typography>

            {/* Allocation gauge */}
            <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px solid #EEF0F8' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#475569', mb: 1.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Allocation Gauge
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'stretch', height: 36, borderRadius: '8px', overflow: 'hidden', bgcolor: '#F1F5F9' }}>
                <Box sx={{ flex: m.totalActual || 1, background: over ? 'linear-gradient(90deg,#EF4444,#DC2626)' : 'linear-gradient(90deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 40 }}>
                  <Typography sx={{ fontSize: '0.70rem', fontWeight: 700, color: '#fff' }}>{m.totalActual}h</Typography>
                </Box>
                {m.totalPlanned > m.totalActual && (
                  <Box sx={{ flex: m.totalPlanned - m.totalActual, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '0.70rem', color: '#94A3B8' }}>{m.totalPlanned - m.totalActual}h free</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Recent projects */}
        <Card sx={{ borderRadius: '16px', border: '1px solid #EEF0F8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1E1B4B' }}>Recent Projects</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8', mt: 0.3 }}>Latest operations</Typography>
            </Box>

            <Box component="table" sx={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px' }}>
              <Box component="thead">
                <Box component="tr" sx={{ bgcolor: '#F8F7FF' }}>
                  {['Project', 'Start', 'Status'].map((h, i) => (
                    <Box component="th" key={h} sx={{ 
                      py: 1.5, px: 2, 
                      textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, 
                      letterSpacing: '0.1em', color: '#64748B', textTransform: 'uppercase',
                      borderBottom: '1px solid #EEF0F8',
                      borderRadius: i === 0 ? '8px 0 0 8px' : i === 2 ? '0 8px 8px 0' : 0
                    }}>
                      {h}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {m.recentProjects.map((p: any) => (
                  <Box component="tr" key={p._id} sx={{ '&:hover td': { bgcolor: '#F8F7FF' } }}>
                    <Box component="td" sx={{ py: 1.2, pr: 2, borderTop: '1px solid #F4F6FB' }}>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E1B4B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 }}>{p.name}</Typography>
                    </Box>
                    <Box component="td" sx={{ py: 1.2, pr: 2, borderTop: '1px solid #F4F6FB' }}>
                      <Typography sx={{ fontSize: '0.78rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {new Date(p.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </Typography>
                    </Box>
                    <Box component="td" sx={{ py: 1.2, borderTop: '1px solid #F4F6FB' }}>
                      <Chip
                        label={p.status}
                        size="small"
                        sx={{
                          bgcolor: p.status === 'Active' ? '#D1FAE5' : p.status === 'Completed' ? '#DBEAFE' : '#F1F5F9',
                          color: p.status === 'Active' ? '#059669' : p.status === 'Completed' ? '#1D4ED8' : '#475569',
                          fontWeight: 600, height: 22, fontSize: '0.7rem',
                          border: `1px solid ${p.status === 'Active' ? '#A7F3D0' : p.status === 'Completed' ? '#BFDBFE' : '#E2E8F0'}`,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
                {m.recentProjects.length === 0 && (
                  <Box component="tr">
                    <Box component="td" colSpan={3} sx={{ py: 4, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">No projects yet.</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
