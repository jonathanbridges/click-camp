import { Box } from '@mui/material';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Suspense } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navbar from '../components/Navbar/Navbar';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { User } from '../types/auth';

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    getCurrentUser: () => Promise<User | null>;
    isAuthenticated: () => Promise<boolean>;
    login: typeof api.auth.login;
    demoLogin: typeof api.auth.demoLogin;
    signup: typeof api.auth.signup;
    logout: typeof api.auth.logout;
    user: User | null;
    isLoading: boolean;
  };
  listings: {
    getAll: typeof api.listings.getAll;
    getOne: typeof api.listings.getOne;
  };
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <ErrorBoundary>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </ErrorBoundary>
  ),
}); 