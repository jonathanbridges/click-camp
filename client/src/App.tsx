import { QueryClientProvider } from '@tanstack/react-query';
import { AppRouterProvider } from './router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { queryClient } from './lib/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouterProvider queryClient={queryClient} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
