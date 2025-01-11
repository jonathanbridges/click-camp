import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createRouter, type RouterContext } from '@tanstack/react-router';
import { api } from './lib/api';
import type { AuthResponse, LoginCredentials, SignupCredentials, User } from './types/auth';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { profileRoute } from './routes/Profile';
import { listingsRoute } from './routes/Listings';
import { listingRoute } from './routes/Listing';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './lib/queryKeys';
import { Listing } from './types/listing';

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
      getAll: () => Promise<Listing[]>;
      getOne: (id: number) => Promise<Listing>;
    };
    reservations: {
      getAll: () => Promise<any>;
      create: (params: {
        listing_id: number;
        check_in: string;
        check_out: string;
        guest_count: number;
      }) => Promise<any>;
    };
    isLoading: boolean;
  }
}

const routeTree = rootRoute.addChildren([indexRoute, profileRoute, listingsRoute, listingRoute]);

// Create the router instance
export const createRouterInstance = (_: QueryClient, context: RouterContext) => {
  const router = createRouter({
    routeTree,
    context,
    defaultPreload: 'intent',
    defaultPreloadDelay: 100,
  });
  
  return router;
};

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
    reservations: api.reservations,
    isLoading: false,
  };

  const router = createRouterInstance(queryClient, context);

  return <RouterProvider router={router} />;
}; 