import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { profileRoute } from './routes/Profile';
import { listingsRoute } from './routes/Listings';

const routeTree = rootRoute.addChildren([indexRoute, profileRoute, listingsRoute]);

// Create the router instance
export const createRouterInstance = (queryClient: QueryClient) => {
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadDelay: 100,
  });
  
  return router;
};

// Router provider component
interface RouterProviderProps {
  queryClient: QueryClient;
}

export const AppRouterProvider = ({ queryClient }: RouterProviderProps) => {
  const router = createRouterInstance(queryClient);
  return <RouterProvider router={router} />;
}; 