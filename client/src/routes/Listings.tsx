import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { createRoute, Link } from '@tanstack/react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Listing } from '../types/listing';
import { rootRoute } from './__root';
import { QueryKeys } from '../lib/queryKeys';
import { AppRoutes } from '../lib/routes';

export const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoutes.LISTINGS,
  loader: async ({ context }) => {
    const listings = await context.queryClient.fetchQuery({
      queryKey: [QueryKeys.LISTINGS],
      queryFn: () => context.listings.getAll(),
      staleTime: 1000 * 60,
    });

    return {
      listings,
    };
  },
  pendingMs: 1000,
  pendingComponent: () => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Campsites
        </Typography>
        <LoadingSpinner />
      </Box>
    </Container>
  ),
  errorComponent: ({ error }) => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" color="error" gutterBottom>
          Error Loading Listings
        </Typography>
        <Typography color="error">{error.message}</Typography>
      </Box>
    </Container>
  ),
  component: Listings,
});

function Listings() {
  const { listings } = listingsRoute.useLoaderData();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Campsites
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {listings.map((listing: Listing) => (
            <Grid2 key={listing.id} size={{ xs: 4, sm: 4, md: 4 }}>
              <Link 
                to="/listing/$listingId" 
                params={{ listingId: listing.id.toString() }}
                style={{ textDecoration: 'none' }}
              >
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}>
                  {listing.photo_urls?.[0] && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={listing.photo_urls[0]}
                      alt={listing.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {listing.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {listing.city}, {listing.state}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${listing.price_per_night}/night
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
} 