import { Box, Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { createRoute, Link } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { useListings } from '../hooks/useListings';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Listing } from '../types/listing';

export const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listings',
  component: Listings,
});

function Listings() {
  const { listings, isLoading, error } = useListings();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography color="error">Error loading listings: {error.message}</Typography>
        </Box>
      </Container>
    );
  }

  console.log(listings);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Campsites
        </Typography>
        <Grid container spacing={3}>
          {listings?.map((listing: Listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 