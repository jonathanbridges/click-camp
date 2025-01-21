import { Box, Button, Card, Popover, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { format } from 'date-fns';
import { useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AlertType } from '../../lib/alerts';
import { api } from '../../lib/api';
import { QueryKeys } from '../../lib/queryKeys';
import { AppRoutes } from '../../lib/routes';
import { rootRoute } from '../../routes/__root';
import type { Listing } from '../../types/listing';
import { GuestSelector } from './GuestSelector';
import { ReservationConfirmDialog } from './ReservationConfirmDialog';

interface ReservationCardProps {
  listing: Listing;
}

export function ReservationCard({ listing }: ReservationCardProps) {
  const { auth } = rootRoute.useRouteContext();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection',
  });
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [guestSelectorAnchor, setGuestSelectorAnchor] = useState<HTMLElement | null>(null);
  const navigate = useNavigate({ from: rootRoute.id });
  const queryClient = useQueryClient();

  // Convert unavailable dates strings to Date objects
  const disabledDates = listing.unavailable_dates?.map(date => new Date(date)) || [];

  // Function to check if a date should be disabled
  const isDateBlocked = (date: Date) => {
    // Disable dates before today
    if (date < new Date()) return true;

    // Check if date is in unavailable dates
    return disabledDates.some(unavailableDate => 
      date.getFullYear() === unavailableDate.getFullYear() &&
      date.getMonth() === unavailableDate.getMonth() &&
      date.getDate() === unavailableDate.getDate()
    );
  };

  const createReservation = useMutation({
    mutationFn: async () => {
      if (!dateRange.startDate || !dateRange.endDate) {
        throw new Error('Please select dates');
      }

      const totalGuests = guests.adults + guests.children;
      if (totalGuests < 1) {
        throw new Error('Please add at least one guest');
      }

      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));

      return api.reservations.create({
        listing_id: listing.id,
        check_in: format(dateRange.startDate, 'yyyy-MM-dd'),
        check_out: format(dateRange.endDate, 'yyyy-MM-dd'),
        guest_count: totalGuests,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVATIONS] });
      navigate({ 
        to: AppRoutes.PROFILE,
        search: () => ({ alert: AlertType.RESERVATION_CREATED })
      });
    },
  });

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!auth.user) return;
    setAnchorEl(event.currentTarget);
  };

  const handleGuestClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!auth.user) return;
    setGuestSelectorAnchor(event.currentTarget);
  };

  const handleGuestsChange = (type: 'adults' | 'children' | 'pets', value: number) => {
    setGuests(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleReserve = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return;
    }

    const totalGuests = guests.adults + guests.children;
    if (totalGuests < 1) {
      return;
    }

    setIsDialogOpen(true);
  };

  const handleConfirmReservation = () => {
    createReservation.mutate();
  };

  const totalGuests = guests.adults + guests.children;
  const hasValidDates = dateRange.startDate && dateRange.endDate && 
    dateRange.startDate < dateRange.endDate;

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {!auth.user && (
          <Box
            sx={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              backgroundColor: '#2e7d32',
              color: 'white',
              padding: '4px 16px',
              borderRadius: 24,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              fontWeight: 500,
            }}
          >
            ⭐ Log in to reserve ⭐
          </Box>
        )}
        <Card sx={{ p: 3, position: 'sticky', top: 24 }}>
          <Typography variant="h5" gutterBottom>
            ${listing.price_per_night} <Typography component="span" variant="body1">night</Typography>
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box 
              onClick={handleDateClick}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                cursor: auth.user ? 'pointer' : 'not-allowed',
                '&:hover': auth.user ? {
                  borderColor: 'text.primary'
                } : undefined
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Add dates
              </Typography>
              <Typography variant="body2">
                {hasValidDates 
                  ? `${format(dateRange.startDate!, 'MMM d')} - ${format(dateRange.endDate!, 'MMM d')}`
                  : 'Select dates'}
              </Typography>
            </Box>

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <DateRange
                ranges={[dateRange]}
                onChange={item => setDateRange(item.selection)}
                minDate={new Date()}
                months={2}
                direction="horizontal"
                disabledDates={disabledDates}
                disabledDay={isDateBlocked}
              />
            </Popover>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box 
              onClick={handleGuestClick}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                cursor: auth.user ? 'pointer' : 'not-allowed',
                '&:hover': auth.user ? {
                  borderColor: 'text.primary'
                } : undefined
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Add guests
              </Typography>
              <Typography variant="body2">
                {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
                {guests.pets > 0 && `, ${guests.pets} ${guests.pets === 1 ? 'pet' : 'pets'}`}
              </Typography>
            </Box>

            <Popover
              open={Boolean(guestSelectorAnchor)}
              anchorEl={guestSelectorAnchor}
              onClose={() => setGuestSelectorAnchor(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <GuestSelector
                adults={guests.adults}
                children={guests.children}
                pets={guests.pets}
                maxGuests={listing.max_guests}
                onGuestsChange={handleGuestsChange}
              />
            </Popover>
          </Box>

          <Button
            variant="contained"
            fullWidth
            color="primary"
            disabled={!auth.user || !hasValidDates || totalGuests === 0 || createReservation.isPending}
            onClick={handleReserve}
            sx={{ 
              bgcolor: 'error.main',
              '&:hover': {
                bgcolor: 'error.dark',
              }
            }}
          >
            {createReservation.isPending ? 'Reserving...' : 'Reserve'}
          </Button>

          {createReservation.isError && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {(createReservation.error as Error).message}
            </Typography>
          )}

          {hasValidDates && !createReservation.isError && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                You won't be charged yet
              </Typography>
            </Box>
          )}
        </Card>
      </Box>

      <ReservationConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmReservation}
        dateRange={dateRange}
        guestCount={guests.adults + guests.children}
        pricePerNight={listing.price_per_night}
        listingTitle={listing.title}
        listingImage={listing.photo_urls?.[0]}
        isPending={createReservation.isPending}
        error={createReservation.error as Error}
      />
    </>
  );
} 