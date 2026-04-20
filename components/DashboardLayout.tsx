'use client';
import { Box, AppBar, Toolbar, Typography, Avatar, InputBase, Divider, Badge } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const W = 248;

const NAV = [
  { label: 'Overview',        icon: DashboardRoundedIcon,    href: '/' },
  { label: 'Workers',         icon: PeopleAltRoundedIcon,    href: '/workers' },
  { label: 'Projects',        icon: WorkRoundedIcon,         href: '/projects' },
  { label: 'Work Tracking',   icon: AccessTimeRoundedIcon,   href: '/tracking' },
  { label: 'Workforce Status',icon: GroupsRoundedIcon,        href: '/workforce' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const page = NAV.find(n => n.href === pathname) ?? NAV[0];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F6FB' }}>

      {/* ─── Sidebar ─── */}
      <Box
        sx={{
          width: W,
          flexShrink: 0,
          bgcolor: '#FFFFFF',
          borderRight: '1px solid #EEF0F8',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Logo */}
        <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(124,58,237,0.35)',
          }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>HW</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E1B4B', lineHeight: 1.1 }}>WorkSight</Typography>
            <Typography sx={{ fontSize: '0.62rem', color: '#7C3AED', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Hayleys</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#EEF0F8' }} />

        {/* Nav */}
        <Box component="nav" sx={{ p: 1.5, flexGrow: 1, overflowY: 'auto' }}>
          <Typography sx={{ px: 1.5, pt: 1.5, pb: 1, fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.12em', color: '#A0AEC0', textTransform: 'uppercase' }}>
            Main Menu
          </Typography>
          {NAV.map(({ label, icon: Icon, href }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link key={href} href={href} passHref style={{ textDecoration: 'none' }}>
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1.1,
                  mb: 0.5, borderRadius: '10px', cursor: 'pointer', transition: 'all 0.15s',
                  bgcolor: active ? 'rgba(124,58,237,0.08)' : 'transparent',
                  color: active ? '#7C3AED' : '#64748B',
                  '&:hover': { bgcolor: active ? 'rgba(124,58,237,0.1)' : '#F8F7FF', color: active ? '#7C3AED' : '#1E1B4B' },
                  position: 'relative',
                }}>
                  {/* Left accent bar */}
                  {active && (
                    <Box sx={{
                      position: 'absolute', left: 0, width: 3, height: 20, borderRadius: '0 3px 3px 0',
                      bgcolor: '#7C3AED',
                    }} />
                  )}
                  <Box sx={{
                    width: 32, height: 32, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: active ? 'rgba(124,58,237,0.12)' : 'rgba(100,116,139,0.08)',
                    transition: 'all 0.15s',
                  }}>
                    <Icon sx={{ fontSize: '1.1rem', color: 'inherit' }} />
                  </Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400, color: 'inherit' }}>{label}</Typography>
                </Box>
              </Link>
            );
          })}
        </Box>

        <Divider sx={{ borderColor: '#EEF0F8' }} />

        {/* User footer */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: '10px', bgcolor: '#F8F7FF' }}>
            <Avatar sx={{ width: 34, height: 34, background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', fontSize: '0.75rem', fontWeight: 700, borderRadius: '8px' }}>
              SA
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E1B4B' }}>System Admin</Typography>
              <Typography sx={{ fontSize: '0.68rem', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>admin@hayleys.com</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ─── Main ─── */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Topbar */}
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #EEF0F8', zIndex: 1100 }}>
          <Toolbar sx={{ minHeight: '64px !important', px: 3, gap: 2 }}>
            {/* Page title */}
            <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: '#1E1B4B', whiteSpace: 'nowrap' }}>
              {page.label}
            </Typography>

            {/* Search */}
            <Box sx={{
              flex: 1, mx: 3, maxWidth: 440,
              display: 'flex', alignItems: 'center', gap: 1,
              bgcolor: '#F4F6FB', borderRadius: '12px', px: 2, py: 0.8,
              border: '1px solid #EEF0F8',
              '&:focus-within': { border: '1px solid #7C3AED', bgcolor: '#fff' },
              transition: 'all 0.2s',
            }}>
              <SearchRoundedIcon sx={{ fontSize: '1.1rem', color: '#A0AEC0' }} />
              <InputBase placeholder="Search workers, projects…" sx={{ flex: 1, fontSize: '0.875rem', color: '#475569', '& input::placeholder': { color: '#A0AEC0' } }} />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Notifications */}
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: 16, height: 16 } }}>
              <Box sx={{
                width: 38, height: 38, borderRadius: '10px', bgcolor: '#F4F6FB', border: '1px solid #EEF0F8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                '&:hover': { bgcolor: '#EEF0F8' },
              }}>
                <NotificationsNoneRoundedIcon sx={{ fontSize: '1.2rem', color: '#64748B' }} />
              </Box>
            </Badge>

            {/* User chip */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 1.5, borderLeft: '1px solid #EEF0F8' }}>
              <Avatar sx={{ width: 36, height: 36, background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', fontSize: '0.75rem', fontWeight: 700, borderRadius: '10px' }}>
                SA
              </Avatar>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E1B4B', lineHeight: 1.2 }}>System Admin</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#94A3B8' }}>Administrator</Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3.5 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
