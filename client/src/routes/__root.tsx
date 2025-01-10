import { Box } from '@mui/material';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navbar from '../components/Navbar/Navbar';
import type { AuthResponse, LoginCredentials, SignupCredentials, User } from '../types/auth';
import type { CreateReservationParams, Reservation } from '../types/reservation';
import { Listing } from '@/types/listing';

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    getCurrentUser: () => Promise<User | null>;
    isAuthenticated: () => Promise<boolean>;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    signup: (credentials: SignupCredentials) => Promise<AuthResponse>;
    demoLogin: () => Promise<AuthResponse>;
    logout: () => Promise<void>;
    user: User | null;
    isLoading: boolean;
  };
  listings: {
    getAll: () => Promise<Listing[]>;
    getOne: (id: number) => Promise<Listing>;
  };
  reservations: {
    getAll: () => Promise<Reservation[]>;
    create: (params: CreateReservationParams) => Promise<Reservation>;
  };
  isLoading: boolean;
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