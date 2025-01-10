import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { AppRoutes } from '../lib/routes';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { QueryKeys } from '../lib/queryKeys';
import { format, isFuture } from 'date-fns';
import { Link } from '@tanstack/react-router';
import type { Reservation } from '../types/reservation';

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
    const [user, reservations] = await Promise.all([
      context.queryClient.fetchQuery({
        queryKey: [QueryKeys.AUTH],
        queryFn: () => context.auth.getCurrentUser(),
        staleTime: 1000 * 60,
      }),
      context.queryClient.fetchQuery({
        queryKey: [QueryKeys.RESERVATIONS],
        queryFn: () => context.reservations.getAll(),
        staleTime: 1000 * 60,
      })
    ]);

    return { user, reservations };
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
  const { user, reservations } = profileRoute.useLoaderData();

  const { upcoming, past } = reservations.reduce((acc: { upcoming: Reservation[], past: Reservation[] }, reservation: Reservation) => {
    const checkOutDate = new Date(reservation.check_out);
    if (isFuture(checkOutDate)) {
      acc.upcoming.push(reservation);
    } else {
      acc.past.push(reservation);
    }
    return acc;
  }, { upcoming: [], past: [] });

  const ReservationList = ({ reservations, title }: { reservations: Reservation[], title: string }) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {reservations.length === 0 ? (
        <Typography color="text.secondary">
          No {title.toLowerCase()} reservations.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {reservations.map((reservation: Reservation) => (
            <Grid item xs={12} md={6} key={reservation.id}>
              <Card>
                {reservation.listing.photo_urls?.[0] && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={reservation.listing.photo_urls[0]}
                    alt={reservation.listing.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Link 
                      to="/listing/$listingId" 
                      params={{ listingId: reservation.listing.id.toString() }}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {reservation.listing.title}
                    </Link>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {format(new Date(reservation.check_in), 'MMM d, yyyy')} - {format(new Date(reservation.check_out), 'MMM d, yyyy')}
                  </Typography>
                  <Typography variant="body2">
                    {reservation.guest_count} {reservation.guest_count === 1 ? 'guest' : 'guests'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reservation.listing.city}, {reservation.listing.state}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.username}!
        </Typography>

        <ReservationList reservations={upcoming} title="Upcoming Trips" />
        <ReservationList reservations={past} title="Past Trips" />
      </Box>
    </Container>
  );
} 