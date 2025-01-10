import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Box, Container, Divider, Rating, Typography } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Review } from '../types/listing';
import { rootRoute } from './__root';
import { QueryKeys } from '../lib/queryKeys';
import { AppRoutes } from '../lib/routes';

export const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoutes.LISTING_DETAILS,
  loader: async ({ context, params: { listingId } }) => {
    const listing = await context.queryClient.fetchQuery({
      queryKey: [QueryKeys.LISTING, listingId],
      queryFn: () => context.listings.getOne(parseInt(listingId)),
      staleTime: 1000 * 60,
    });

    return {
      listing,
    };
  },
  pendingMs: 1000,
  pendingComponent: () => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading Campsite...
        </Typography>
        <LoadingSpinner />
      </Box>
    </Container>
  ),
  errorComponent: ({ error }) => (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" color="error" gutterBottom>
          Error Loading Campsite
        </Typography>
        <Typography color="error">{error.message}</Typography>
      </Box>
    </Container>
  ),
  component: ListingPage,
});

function ListingPage() {
  const { listing } = listingRoute.useLoaderData();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Title Section */}
        <Typography variant="h3" component="h1" gutterBottom>
          {listing.title}
        </Typography>

        {/* Rating and Location Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <ThumbUpIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="body1" sx={{ mr: 1 }}>
              {listing.average_rating ? `${Math.round(listing.average_rating * 20)}%` : 'No ratings'}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mr: 2 }}>
            · {listing.reviews?.length || 0} reviews
          </Typography>
          <Typography variant="body1">
            · {listing.city}, {listing.state}
          </Typography>
        </Box>

        {/* Image Gallery */}
        {listing.photo_urls && listing.photo_urls.length > 0 && (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 1,
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            height: '400px'
          }}>
            <Box sx={{ 
              gridColumn: '1 / 2',
              gridRow: '1 / 3',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }
            }}>
              <img src={listing.photo_urls[0]} alt={listing.title} />
            </Box>
            {listing.photo_urls.slice(1, 5).map((url: string, index: number) => (
              <Box key={index} sx={{
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }
              }}>
                <img src={url} alt={`${listing.title} ${index + 2}`} />
              </Box>
            ))}
          </Box>
        )}

        {/* Host Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={listing.host?.avatar_url || undefined}
            alt={`${listing.host?.username}'s avatar`}
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              bgcolor: 'primary.main'
            }}
          >
            {listing.host?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">
              Hosted by {listing.host?.username}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {listing.description}
        </Typography>

        {/* Reviews Section */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {listing.average_rating ? `${Math.round(listing.average_rating * 20)}%` : 'No ratings yet'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {listing.reviews?.length || 0} reviews
            </Typography>
          </Box>

          {listing.reviews?.map((review: Review) => (
            <Box key={review.id} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={review.reviewer.avatar_url || undefined}
                  alt={`${review.reviewer.username}'s avatar`}
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    mr: 2,
                    bgcolor: 'primary.main'
                  }}
                >
                  {review.reviewer.username.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {review.reviewer.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(review.created_at), 'MMMM yyyy')}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  {review.rating >= 4 ? (
                    <ThumbUpIcon sx={{ mr: 1, color: 'success.main' }} />
                  ) : (
                    <SentimentNeutralIcon sx={{ mr: 1, color: 'warning.main' }} />
                  )}
                </Box>
                <Rating 
                  value={review.rating} 
                  readOnly 
                  max={5}
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {review.rating >= 4 ? 'Recommends' : 'Mixed feelings'}
                </Typography>
              </Box>

              <Typography variant="body1">
                {review.content}
              </Typography>

              <Divider sx={{ mt: 3 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
} 