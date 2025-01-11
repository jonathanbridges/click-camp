import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { format, isFuture } from 'date-fns';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { Reservation } from '../types/reservation';
import { CancelReservationDialog } from './CancelReservationDialog';
import { AppRoutes } from '../lib/routes';

interface ReservationDetailsProps {
  reservation: Reservation;
  showListingDetails?: boolean;
}

export function ReservationDetails({ reservation, showListingDetails = true }: ReservationDetailsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isPast = !isFuture(new Date(reservation.check_out));
  const hasReview = reservation.listing.reviews?.some(
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
          <Box sx={{ mt: 2 }}>
            {isPast ? (
              !hasReview && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {/* TODO: Implement review dialog */}}
                >
                  Leave Review
                </Button>
              )
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsDialogOpen(true)}
              >
                Cancel Reservation
              </Button>
            )}
          </Box>
        </CardContent>
      </Box>

      <CancelReservationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        reservationId={reservation.id}
        listingId={reservation.listing_id}
      />
    </Card>
  );
} 