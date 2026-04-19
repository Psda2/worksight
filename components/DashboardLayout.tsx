'use client';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 260;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Workers', icon: <PeopleIcon />, path: '/workers' },
    { text: 'Projects', icon: <WorkIcon />, path: '/projects' },
    { text: 'Work Tracking', icon: <ScheduleIcon />, path: '/tracking' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            {menuItems.find(i => i.path === pathname)?.text || 'WorkSight'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ px: 3, pt: 1 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
            WorkSight
          </Typography>
        </Toolbar>
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, pl: 2, display: 'block', mb: 1 }}>
            MAIN MENU
          </Typography>
          <List>
            {menuItems.map((item) => {
              const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <Link href={item.path} passHref style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <ListItemButton sx={{ borderRadius: '8px', bgcolor: isActive ? 'primary.light' : 'transparent', color: isActive ? 'primary.contrastText' : 'inherit', '&:hover': { bgcolor: isActive ? 'primary.main' : 'action.hover' }}}>
                      <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'inherit' : 'action.active' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ fontWeight: isActive ? 600 : 500 }}>{item.text}</Typography>} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 4, minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
