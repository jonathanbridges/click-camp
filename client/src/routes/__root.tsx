import { Box } from '@mui/material';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Suspense } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navbar from '../components/Navbar/Navbar';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Box component="main" sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Suspense>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </ErrorBoundary>
  ),
}); 