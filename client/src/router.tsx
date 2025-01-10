import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { profileRoute } from './routes/Profile';
import { listingsRoute } from './routes/Listings';
import { listingRoute } from './routes/Listing';
import { api } from './lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from './lib/queryKeys';
import type { RouterContext } from './routes/__root';

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

// Router provider component that handles auth state
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
      demoLogin: api.auth.demoLogin,
      signup: api.auth.signup,
      logout: api.auth.logout,
      user,
      isLoading,
    },
    listings: {
      getAll: api.listings.getAll,
      getOne: api.listings.getOne,
    },
  };

  const router = createRouterInstance(queryClient, context);

  return <RouterProvider router={router} />;
}; 