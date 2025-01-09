import { Box, Container, Typography, Avatar, Divider, Rating } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from '@tanstack/react-router';
import type { Listing, Review } from '../types/listing';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { useListing } from '../hooks/useListing';
import { format } from 'date-fns';

export const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listing/$listingId',
  component: ListingPage,
});

function ListingPage() {
  const { listingId } = useParams({ from: listingRoute.id });
  const { data: listing, isLoading, error } = useListing(listingId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography color="error">Error loading listing: {error instanceof Error ? error.message : 'Unknown error'}</Typography>
        </Box>
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Listing not found</Typography>
        </Box>
      </Container>
    );
  }

    console.log(listing.host?.avatar_url, 'avatar url');
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