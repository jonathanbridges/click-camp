import { QueryClient } from '@tanstack/react-query';

export interface RouterContext {
  queryClient: QueryClient;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: {
      context: RouterContext;
    };
  }
} 