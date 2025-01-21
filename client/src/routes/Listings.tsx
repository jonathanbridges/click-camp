import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Card, CardContent, Container, CircularProgress, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useIsFetching } from '@tanstack/react-query';
import { createRoute, Link, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import ImageCarousel from '../components/ImageCarousel';
import ListingsMap from '../components/Map/ListingsMap';
import { DEFAULT_LAT, DEFAULT_LNG } from '../lib/constants';
import { QueryKeys } from '../lib/queryKeys';
import { AppRoutes } from '../lib/routes';
import type { Listing } from '../types/listing';
import { rootRoute } from './__root';

const searchSchema = z.object({
  originLat: z.string().optional(),
  originLng: z.string().optional(),
  neLat: z.string().optional(),
  neLng: z.string().optional(),
  swLat: z.string().optional(),
  swLng: z.string().optional(),
  mapZoomLevel: z.string().optional(),
});

function ListingSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="30%" height={32} />
      </CardContent>
    </Card>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate({ to: '/listing/$listingId', params: { listingId: listing.id.toString() } });
  };

  const formattedRating = listing.average_rating > 0 
    ? listing.average_rating.toFixed(1) 
    : 'New';

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
      onClick={handleCardClick}
    >
      <ImageCarousel 
        images={listing.photo_urls} 
        height={200}
        onImageClick={handleCardClick}
      />

      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {listing.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <StarIcon sx={{ color: 'primary.main', fontSize: '1rem', mr: 0.5 }} />
          <Typography variant="body2" color="text.primary" sx={{ mr: 0.5 }}>
            {formattedRating}
          </Typography>
          {listing.review_count > 0 && (
            <Typography variant="body2" color="text.secondary">
              ({listing.review_count} {listing.review_count === 1 ? 'review' : 'reviews'})
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {listing.city}, {listing.state}
        </Typography>
        <Typography variant="h6" color="primary">
          ${listing.price_per_night}/night
        </Typography>
      </CardContent>
    </Card>
  );
}

function ListingsPending() {
  return (
    <Container maxWidth="xl" sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <Grid container spacing={2} sx={{ height: '100%', py: 2 }}>
        {/* Listings Section */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: '100%', overflowY: 'auto' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1">
              <Skeleton width={200} />
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <ListingSkeleton />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Map Section */}
        <Grid 
          size={{ xs: 12, md: 6 }}
          sx={{ 
            height: '100%',
            display: { xs: 'none', md: 'block' },
            position: 'sticky',
            top: 0,
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              height: '100%', 
              bgcolor: 'action.hover', 
              borderRadius: 1,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2,
                }}
              >
                <CircularProgress size={32} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'background.paper', px: 2, py: 1, borderRadius: 1, boxShadow: 1 }}>
                Loading map...
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoutes.LISTINGS,
  validateSearch: searchSchema,
  pendingComponent: ListingsPending,
  loader: async ({ context, location }) => {
    const { originLat, originLng, neLat, neLng, swLat, swLng } = location.search as z.infer<typeof searchSchema>;

    let locationName = '';
    let lat = originLat ? parseFloat(originLat) : DEFAULT_LAT;
    let lng = originLng ? parseFloat(originLng) : DEFAULT_LNG;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      );
      const data = await response.json();
      locationName = data.address?.city || data.address?.town || data.address?.county || 'San Francisco Bay Area';
    } catch (error) {
      console.error('Error fetching location name:', error);
      locationName = 'San Francisco Bay Area';
    }

    // If no parameters are provided, use defaults that show the SF Bay Area
    if (!originLat && !originLng) {
      const listings = await context.listings.getAll({
        originLat: DEFAULT_LAT,
        originLng: DEFAULT_LNG,
        neLat: DEFAULT_LAT + 0.8, // Roughly covers the Bay Area
        neLng: DEFAULT_LNG + 1.0,
        swLat: DEFAULT_LAT - 0.8,
        swLng: DEFAULT_LNG - 1.0,
      });
      return { listings, locationName: 'San Francisco Bay Area' };
    }

    const listings = await context.listings.getAll({
      originLat: lat,
      originLng: lng,
      neLat: neLat ? parseFloat(neLat) : undefined,
      neLng: neLng ? parseFloat(neLng) : undefined,
      swLat: swLat ? parseFloat(swLat) : undefined,
      swLng: swLng ? parseFloat(swLng) : undefined,
    });
    return { listings, locationName };
  },
  pendingMs: 250,
  component: Listings,
});

function ListingsContent() {
  const { listings, locationName } = listingsRoute.useLoaderData();
  const navigate = useNavigate();
  const isFetching = useIsFetching({ queryKey: [QueryKeys.LISTINGS] });

  const handleReset = () => {
    navigate({
      to: AppRoutes.LISTINGS,
      search: {
        originLat: DEFAULT_LAT.toString(),
        originLng: DEFAULT_LNG.toString(),
        neLat: (DEFAULT_LAT + 0.8).toString(),
        neLng: (DEFAULT_LNG + 1.0).toString(),
        swLat: (DEFAULT_LAT - 0.8).toString(),
        swLng: (DEFAULT_LNG - 1.0).toString(),
        mapZoomLevel: "9",
      },
      replace: true,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <Grid container spacing={2} sx={{ height: '100%', py: 2 }}>
        {/* Listings Section */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: '100%', overflowY: 'auto' }}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              {isFetching ? (
                <Skeleton width={180} />
              ) : (
                `${listings.length} campsite${listings.length === 1 ? '' : 's'} near ${locationName ?? "..."}`
              )}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {isFetching ? (
                <Skeleton width={120} />
              ) : (
                'Search updates as you move the map'
              )}
            </Typography>
          </Box>
          {isFetching ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <ListingSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : listings.length > 0 ? (
            <Grid container spacing={2}>
              {listings.map((listing: Listing) => (
                <Grid size={{ xs: 12, sm: 6 }} key={listing.id}>
                  <Link 
                    to="/listing/$listingId" 
                    params={{ listingId: listing.id.toString() }}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListingCard listing={listing} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mt: 4,
              }}
            >
              <Box 
                component="img"
                src="https://app-name-seeds.s3.us-west-1.amazonaws.com/404.jpg"
                alt="No results found"
                sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  opacity: 0.5,
                  mb: 3,
                }}
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No campsites found in this area
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleReset}
                sx={{ mt: 2 }}
              >
                Reset to San Francisco
              </Button>
            </Box>
          )}
        </Grid>

        {/* Map Section */}
        <Grid 
          size={{ xs: 12, md: 6 }}
          sx={{ 
            height: '100%',
            display: { xs: 'none', md: 'block' },
            position: 'sticky',
            top: 0,
            overflow: 'hidden',
          }}
        >
          <ListingsMap listings={listings} />
        </Grid>
      </Grid>
    </Container>
  );
}

function Listings() {
  return <ListingsContent />;
} 