import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { format, isFuture } from 'date-fns';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { AppRoutes } from '../lib/routes';
import { CancelReservationDialog } from './CancelReservationDialog';
import { UpdateReservationDialog } from './UpdateReservationDialog';
import { ReviewDialog } from './ReviewDialog';
import type { Reservation } from '../types/reservation';
import RateReview from '@mui/icons-material/RateReview';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { UpdateReviewDialog } from './UpdateReviewDialog';
import { DeleteReviewDialog } from './DeleteReviewDialog';

interface ReservationDetailsProps {
  reservation: Reservation;
  showListingDetails?: boolean;
}

export function ReservationDetails({ reservation, showListingDetails = true }: ReservationDetailsProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isUpdateReviewDialogOpen, setIsUpdateReviewDialogOpen] = useState(false);
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = useState(false);
  const isPast = !isFuture(new Date(reservation.check_out));
  const hasReview = reservation.listing.reviews?.some(
    review => review.reviewer.id === reservation.guest_id
  );
  const userReview = reservation.listing.reviews?.find(
    review => review.reviewer.id === reservation.guest_id
  );

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      {showListingDetails && reservation.listing.photo_urls?.[0] && (
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={reservation.listing.photo_urls[0]}
          alt={reservation.listing.title}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          {showListingDetails && (
            <>
              <Link 
                to={AppRoutes.LISTING_DETAILS} 
                params={{ listingId: reservation.listing_id.toString() }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="h6">
                  {reservation.listing.title}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {reservation.listing.city}, {reservation.listing.state}
              </Typography>
            </>
          )}
          <Typography variant="body1">
            {format(new Date(reservation.check_in), 'MMM d, yyyy')} - {format(new Date(reservation.check_out), 'MMM d, yyyy')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reservation.guest_count} {reservation.guest_count === 1 ? 'guest' : 'guests'}
          </Typography>
          {!isPast && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setIsUpdateDialogOpen(true)}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setIsCancelDialogOpen(true)}
                >
                  Cancel
                </Button>
              </>
            </Box>
          )}
          {/* Review Management */}
          {isPast && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              {!hasReview && (
                <Button
                  variant="outlined"
                  onClick={() => setIsReviewDialogOpen(true)}
                  startIcon={<RateReview />}
                >
                  Leave a Review
                </Button>
              )}
              {userReview && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => setIsUpdateReviewDialogOpen(true)}
                    startIcon={<Edit />}
                  >
                    Edit Review
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setIsDeleteReviewDialogOpen(true)}
                    startIcon={<Delete />}
                  >
                    Delete Review
                  </Button>
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Box>

      <CancelReservationDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        reservationId={reservation.id}
        listingId={reservation.listing_id}
      />

      <UpdateReservationDialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        reservation={reservation}
      />

      <ReviewDialog
        open={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        listing={reservation.listing}
        reservationId={reservation.id}
      />

      {userReview && (
        <>
          <UpdateReviewDialog
            open={isUpdateReviewDialogOpen}
            onClose={() => setIsUpdateReviewDialogOpen(false)}
            review={userReview}
            listing={reservation.listing}
          />

          <DeleteReviewDialog
            open={isDeleteReviewDialogOpen}
            onClose={() => setIsDeleteReviewDialogOpen(false)}
            reviewId={userReview.id}
            listingId={reservation.listing_id}
          />
        </>
      )}
    </Card>
  );
} 