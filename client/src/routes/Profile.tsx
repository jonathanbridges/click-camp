import { Box, Container, Typography } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import { isFuture } from 'date-fns';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ReservationDetails } from '../components/ReservationDetails';
import { QueryKeys } from '../lib/queryKeys';
import type { Reservation } from '../types/reservation';
import { rootRoute } from './__root';

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  loader: async ({ context }) => {
    const reservations = await context.queryClient.fetchQuery({
      queryKey: [QueryKeys.RESERVATIONS],
      queryFn: () => context.reservations.getAll(),
    });

    return { reservations };
  },
  pendingMs: 1000,
  pendingComponent: () => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading Reservations...
        </Typography>
        <LoadingSpinner />
      </Box>
    </Container>
  ),
  errorComponent: ({ error }) => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" color="error" gutterBottom>
          Error Loading Reservations
        </Typography>
        <Typography color="error">{error.message}</Typography>
      </Box>
    </Container>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const { reservations } = profileRoute.useLoaderData();
  const upcomingReservations = reservations.filter((r: Reservation) => isFuture(new Date(r.check_out)));
  const pastReservations = reservations.filter((r: Reservation) => !isFuture(new Date(r.check_out)));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Reservations
        </Typography>

        {upcomingReservations.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Upcoming Trips
            </Typography>
            {upcomingReservations.map((reservation: Reservation) => (
              <ReservationDetails 
                key={reservation.id} 
                reservation={reservation}
              />
            ))}
          </>
        )}

        {pastReservations.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Past Trips
            </Typography>
            {pastReservations.map((reservation: Reservation) => (
              <ReservationDetails 
                key={reservation.id} 
                reservation={reservation}
              />
            ))}
          </>
        )}

        {reservations.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            You don't have any reservations yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
} 