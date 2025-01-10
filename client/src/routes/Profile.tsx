import { Box, Container, Typography } from '@mui/material';
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { AppRoutes } from '../lib/routes';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoutes.PROFILE,
  beforeLoad: async ({ context }) => {
    const isAuthenticated = await context.auth.isAuthenticated();
    if (!isAuthenticated) {
      throw redirect({
        to: AppRoutes.HOME,
      });
    }
  },
  loader: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: () => context.auth.getCurrentUser(),
      staleTime: 1000 * 60, // 1 minute
    });

    return { user };
  },
  pendingMs: 1000,
  pendingComponent: () => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading Profile...
        </Typography>
        <LoadingSpinner />
      </Box>
    </Container>
  ),
  errorComponent: ({ error }) => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" color="error" gutterBottom>
          Error Loading Profile
        </Typography>
        <Typography color="error">{error.message}</Typography>
      </Box>
    </Container>
  ),
  component: Profile,
});

function Profile() {
  const { user } = profileRoute.useLoaderData();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.username}!
        </Typography>
        {/* Add more profile content here */}
      </Box>
    </Container>
  );
} 