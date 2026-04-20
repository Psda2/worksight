import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#059669', light: '#10B981', dark: '#047857', contrastText: '#fff' },
    secondary: { main: '#0F172A', light: '#334155', dark: '#020617', contrastText: '#fff' },
    background: { default: '#F1F5F9', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B' },
    divider: '#E2E8F0',
    error: { main: '#DC2626' },
    success: { main: '#059669' },
    warning: { main: '#D97706' },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h3: { fontWeight: 700, letterSpacing: '-0.025em', fontSize: '2rem' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.5rem' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, fontSize: '0.875rem' },
    subtitle2: { fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748B' },
    body1: { fontSize: '0.9375rem' },
    body2: { fontSize: '0.875rem' },
    button: { fontWeight: 600, textTransform: 'none' },
    caption: { fontSize: '0.8rem' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 6, padding: '7px 18px', fontWeight: 600 },
        contained: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#059669',
            '&:hover': { backgroundColor: '#047857' },
          }),
        }),
        outlined: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            borderColor: '#059669',
            color: '#059669',
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          border: '1px solid #E2E8F0',
          overflow: 'visible',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: { root: { padding: '20px 24px', '&:last-child': { paddingBottom: 20 } } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6, fontWeight: 600, fontSize: '0.78rem' } },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748B', backgroundColor: '#F8FAFC', padding: '10px 16px' },
        body: { padding: '12px 16px', fontSize: '0.875rem', borderColor: '#F1F5F9' },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRight: 'none' } },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiLinearProgress: {
      styleOverrides: { root: { borderRadius: 2 } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.25)' } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#E2E8F0' } },
    },
  },
});
