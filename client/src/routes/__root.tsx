import { Listing } from '@/types/listing';
import { Box } from '@mui/material';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';
import { z } from 'zod';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { GlobalAlert } from '../components/GlobalAlert';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Navbar from '../components/Navbar/Navbar';
import type { AuthResponse, LoginCredentials, SignupCredentials, User } from '../types/auth';
import type { CreateReservationParams, Reservation } from '../types/reservation';
import { AlertType, getAlertMessage } from '../lib/alerts';

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
    getForListing: (listingId: number) => Promise<Reservation[]>;
    delete: (id: number) => Promise<void>;
  };
  isLoading: boolean;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  validateSearch: z.object({
    alert: z.nativeEnum(AlertType).optional(),
  }),
  loaderDeps: ({ search: { alert } }) => ({ alert }),
  loader: ({ deps: { alert } }) => {
    return { alert };
  },
  component: () => {
    const { alert } = rootRoute.useLoaderData();
    
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Box>
        <GlobalAlert 
          open={!!alert}
          message={alert ? getAlertMessage(alert) : ''}
          severity="success"
        />
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </Box>
    );
  },
}); 