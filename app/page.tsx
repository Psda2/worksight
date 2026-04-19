import { Box, Typography, Card, CardContent, LinearProgress, Stack, Chip, Divider } from '@mui/material';
import { getDashboardMetrics } from './actions';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const metrics = await getDashboardMetrics();

  // Handle division by zero
  const varianceRatio = metrics.totalPlanned > 0 ? (metrics.totalActual / metrics.totalPlanned) * 100 : 0;
  // Make sure it maxes out gracefully in the progress bar
  const visualRatio = Math.min(varianceRatio, 100);
  const isOverBudget = varianceRatio > 100;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Executive Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back. Here is the latest on workforce tracking and allocations.
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
          gap: 3,
          mb: 4
        }}
      >
        {[
          { title: 'Total Workers', value: metrics.totalWorkers, color: 'primary.main' },
          { title: 'Active Projects', value: metrics.activeProjects, color: 'secondary.main' },
          { title: 'Hours Logged Today', value: metrics.hoursToday, color: 'info.main' },
          { title: 'Global Completed %', value: `${visualRatio.toFixed(1)}%`, color: 'success.main' },
        ].map((stat, i) => (
          <Card key={i} sx={{ border: '1px solid #E2E8F0', boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.05)' }}>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.5fr 1fr' }, gap: 3 }}>
        <Card sx={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Planned vs Actual Labor (Global)</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Comparing the total required hours across all defined tasks vs the cumulative hours actually logged by the workforce so far.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
               <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Total Hours Logged</Typography>
               <Typography variant="subtitle2" color={isOverBudget ? 'error' : 'text.primary'} sx={{ fontWeight: 600 }}>
                 {metrics.totalActual} / {metrics.totalPlanned}
               </Typography>
            </Box>
            <LinearProgress 
               variant="determinate" 
               value={visualRatio} 
               color={isOverBudget ? 'error' : 'primary'}
               sx={{ height: 16, borderRadius: 8, mb: 1 }} 
            />
            {isOverBudget ? (
               <Typography variant="caption" color="error" sx={{ fontWeight: 600 }}>⚠️ You have exceeded the planned hours allocation!</Typography>
            ) : (
               <Typography variant="caption" color="text.secondary">Remaining Budget: {metrics.totalPlanned - metrics.totalActual} hours</Typography>
            )}
          </CardContent>
        </Card>

        <Card sx={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Recent Projects</Typography>
            <Stack spacing={2} divider={<Divider />}>
              {metrics.recentProjects.length === 0 ? <Typography variant="body2" color="text.secondary">No projects.</Typography> : null}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {metrics.recentProjects.map((proj: any) => (
                <Box key={proj._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{proj.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(proj.startDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip size="small" label={proj.status} color={proj.status === 'Active' ? 'success' : 'default'} />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
