import { QueryClient, useQuery } from '@tanstack/react-query';
import { RouterProvider, createRouter, type RouterContext } from '@tanstack/react-router';
import { api } from './lib/api';
import { QueryKeys } from './lib/queryKeys';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { listingRoute } from './routes/Listing';
import { listingsRoute } from './routes/Listings';
import { notFoundRoute } from './routes/NotFound';
import { profileRoute } from './routes/Profile';
import type { AuthResponse, LoginCredentials, SignupCredentials, User } from './types/auth';
import type { Listing } from './types/listing';
import type { CreateReservationParams, Reservation } from './types/reservation';
// Register your router
declare module '@tanstack/react-router' {
  interface RouterContext {
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
      getAll: (params?: {
        originLat?: number;
        originLng?: number;
        neLat?: number;
        neLng?: number;
        swLat?: number;
        swLng?: number;
      }) => Promise<Listing[]>;
      getOne: (id: number) => Promise<Listing>;
    };
    reservations: {
      getAll: () => Promise<any>;
      create: (params: CreateReservationParams) => Promise<Reservation>;
      update: (id: number, params: Partial<CreateReservationParams>) => Promise<Reservation>;
      getForListing: (listing_id: number) => Promise<Reservation[]>;
      delete: (reservation_id: number) => Promise<void>;  
    };
    isLoading: boolean;
  }

  interface HistoryState {
    showSuccessAlert?: boolean;
  }
}

const routeTree = rootRoute.addChildren([indexRoute, profileRoute, listingsRoute, listingRoute, notFoundRoute]);

interface RouterProviderProps {
  queryClient: QueryClient;
}

export const AppRouterProvider = ({ queryClient }: RouterProviderProps) => {
  const { data: user = null, isLoading } = useQuery({
    queryKey: [QueryKeys.AUTH],
    queryFn: api.auth.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const context: RouterContext = {
    queryClient,
    auth: {
      getCurrentUser: api.auth.getCurrentUser,
      isAuthenticated: async () => {
        const user = await api.auth.getCurrentUser();
        return !!user;
      },
      login: api.auth.login,
      signup: api.auth.signup,
      demoLogin: api.auth.demoLogin,
      logout: api.auth.logout,
      user,
      isLoading,
    },
    listings: {
      getAll: api.listings.getAll,
      getOne: api.listings.getOne,
    },
    reservations: {
      getAll: api.reservations.getAll,
      create: api.reservations.create,
      update: api.reservations.update,
      getForListing: api.reservations.getForListing,
      delete: api.reservations.delete,
    },
    isLoading: false,
  };

  const router = createRouter({
    routeTree,
    context,
  });

  return <RouterProvider router={router} />;
}; 