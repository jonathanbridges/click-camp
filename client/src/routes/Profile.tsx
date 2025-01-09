import { Box, Container, Typography } from '@mui/material';
import { createRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { rootRoute } from './__root';

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  beforeLoad: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({
        to: '/',
        search: {
          authModal: 'login',
        },
      });
    }
  },
  component: Profile,
});

function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Welcome back, {user?.name ?? 'Camper'}!
        </Typography>
      </Box>
    </Container>
  );
} 