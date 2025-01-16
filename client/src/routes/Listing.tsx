import { Box, Container, Typography, Button, Rating, Card, CardContent, Avatar, IconButton } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import { isFuture, differenceInMonths, parseISO } from 'date-fns';
import { useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ReservationCard } from '../components/ReservationCard/ReservationCard';
import { ReviewDialog } from '../components/ReviewDialog';
import { UpdateReviewDialog } from '../components/UpdateReviewDialog';
import { DeleteReviewDialog } from '../components/DeleteReviewDialog';
import { rootRoute } from './__root';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WarningIcon from '@mui/icons-material/Warning';
import type { Reservation } from '../types/reservation';
import type { Review } from '../types/listing';

export const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listing/$listingId',
  loader: async ({ context, params }) => {
    const listing = await context.listings.getOne(parseInt(params.listingId));
    
    let reservations: Reservation[] = [];
    if (context.auth.user) {
      reservations = await context.reservations.getAll();
    }

    return { listing, reservations };
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

// Helper function to calculate months between dates
const getMonthsBetween = (createdAt: string) => {
  const now = new Date();
  const createdDate = parseISO(createdAt);
  
  console.log('Date calculation:', {
    createdAt,
    createdDate,
    now,
    isFuture: createdDate > now
  });

  // For demo data with future dates, use January 2024 as the account creation date
  if (createdDate > now) {
    return '6 months'; // For demo data, show a fixed "6 months" tenure
  }

  const months = Math.max(0, differenceInMonths(now, createdDate));
  console.log('Calculated months:', months);
  
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
  
  return `${months} ${months === 1 ? 'month' : 'months'}`;
};

function ListingPage() {
  const { listing, reservations } = listingRoute.useLoaderData();
  const { auth } = rootRoute.useRouteContext();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isUpdateReviewDialogOpen, setIsUpdateReviewDialogOpen] = useState(false);
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Add debugging for reviews data
  console.log('Reviews data:', listing.reviews?.map((review: Review) => ({
    reviewer: review.reviewer.username,
    created_at: review.reviewer.created_at,
    months: getMonthsBetween(review.reviewer.created_at)
  })));

  // Find past reservations for the current user that don't have reviews
  const pastReservationsWithoutReviews = auth.user ? reservations
    .filter((r: Reservation) => 
      r.listing_id === listing.id && 
      r.guest_id === auth.user?.id && 
      !isFuture(new Date(r.check_out)) &&
      !listing.reviews?.some((review: Review) => review.reviewer.id === auth.user?.id)
    ) : [];

  const handleUpdateClick = (review: Review) => {
    setSelectedReview(review);
    setIsUpdateReviewDialogOpen(true);
  };

  const handleDeleteClick = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteReviewDialogOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Title Section */}
        <Typography variant="h3" component="h1" gutterBottom>
          {listing.title}
        </Typography>

        {/* Host Information */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={listing.host.avatar_url || ''}
            sx={{ mr: 1 }}
          >
            {listing.host.username[0]}
          </Avatar>
          <Typography variant="subtitle1">
            Hosted by {listing.host.username}
          </Typography>
        </Box>

        {/* Rating and Location Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              👍 {listing.average_rating ? `${Math.round((parseFloat(listing.average_rating) / 5) * 100)}%` : 'No ratings'}
            </Typography>
            <Typography variant="body1" sx={{ mr: 1 }}>
              · {listing.reviews?.length || 0} reviews
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mr: 2 }}>
            · {listing.city}, {listing.state}
          </Typography>
          <Typography variant="body1">
            · Up to {listing.max_guests} guests
          </Typography>
        </Box>

        {/* Image Gallery */}
        <Box sx={{ mb: 4 }}>
          <Box
            component="img"
            src={listing.photo_urls?.[0]}
            alt={listing.title}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Main Content Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 4 }}>
          {/* Left Column */}
          <Box>
            {/* Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                About this campsite
              </Typography>
              <Typography variant="body1">
                {listing.description}
              </Typography>
            </Box>

            {/* Reviews Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">
                  Reviews
                </Typography>
                {pastReservationsWithoutReviews.length > 0 && (
                  <Button 
                    variant="outlined" 
                    onClick={() => setIsReviewDialogOpen(true)}
                  >
                    Leave a Review
                  </Button>
                )}
              </Box>

              {listing.reviews?.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No reviews yet
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {listing.reviews?.map((review: Review) => (
                    <Card key={review.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={review.reviewer.avatar_url || ''}
                              sx={{ mr: 1 }}
                            >
                              {review.reviewer.username[0]}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1">
                                {review.reviewer.username}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {getMonthsBetween(review.reviewer.created_at)} on ClickCamp
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(review.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}
                              </Typography>
                            </Box>
                          </Box>
                          {auth.user?.id === review.reviewer.id && (
                            <Box>
                              <IconButton 
                                onClick={() => handleUpdateClick(review)}
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                onClick={() => handleDeleteClick(review)}
                                size="small"
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={review.rating} readOnly size="small" sx={{ mr: 1 }} />
                          {review.rating > 3 ? (
                            <Typography 
                              variant="body2" 
                              color="success.main" 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                fontWeight: 600,
                                gap: 0.5
                              }}
                            >
                              <ThumbUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
                              Recommends
                            </Typography>
                          ) : (
                            <Typography 
                              variant="body2" 
                              color="error.main" 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: 0.5
                              }}
                            >
                              <WarningIcon sx={{ color: 'error.main', fontSize: 20 }} />
                              Mixed feelings
                            </Typography>
                          )}
                        </Box>
                        <Typography variant="body1">
                          {review.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* Right Column - Reservation Card */}
          <Box sx={{ position: 'sticky', top: 24 }}>
            <ReservationCard listing={listing} />
          </Box>
        </Box>
      </Box>

      {pastReservationsWithoutReviews[0] && (
        <ReviewDialog
          open={isReviewDialogOpen}
          onClose={() => setIsReviewDialogOpen(false)}
          listing={listing}
          reservationId={pastReservationsWithoutReviews[0].id}
        />
      )}

      {selectedReview && (
        <>
          <UpdateReviewDialog
            open={isUpdateReviewDialogOpen}
            onClose={() => {
              setIsUpdateReviewDialogOpen(false);
              setSelectedReview(null);
            }}
            review={selectedReview}
            listing={listing}
            useRedirect={false}
          />

          <DeleteReviewDialog
            open={isDeleteReviewDialogOpen}
            onClose={() => {
              setIsDeleteReviewDialogOpen(false);
              setSelectedReview(null);
            }}
            reviewId={selectedReview.id}
            listingId={listing.id}
          />
        </>
      )}
    </Container>
  );
} 