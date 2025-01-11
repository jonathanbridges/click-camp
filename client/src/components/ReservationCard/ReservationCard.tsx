import { Box, Button, Card, Popover, Typography } from '@mui/material';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { GuestSelector } from './GuestSelector';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../../lib/api';
import { QueryKeys } from '../../lib/queryKeys';
import { AppRoutes } from '../../lib/routes';
import type { CreateReservationParams } from '../../types/reservation';

interface ReservationCardProps {
  listingId: number;
  pricePerNight: number;
  maxGuests: number;
  unavailableDates?: string[];
}

export function ReservationCard({ listingId, pricePerNight, maxGuests, unavailableDates = [] }: ReservationCardProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    pets: 0
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [guestSelectorAnchor, setGuestSelectorAnchor] = useState<HTMLElement | null>(null);

  // Convert unavailable dates strings to Date objects
  const disabledDates = unavailableDates?.map(date => new Date(date)) || [];

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
    mutationFn: () => api.reservations.create({
      listing_id: listingId,
      check_in: format(dateRange.startDate!, 'yyyy-MM-dd'),
      check_out: format(dateRange.endDate!, 'yyyy-MM-dd'),
      guest_count: guests.adults + guests.children
    } as CreateReservationParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVATIONS] });
      navigate({ to: AppRoutes.PROFILE });
    }
  });

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGuestClick = (event: React.MouseEvent<HTMLElement>) => {
    setGuestSelectorAnchor(event.currentTarget);
  };

  const handleGuestsChange = (type: 'adults' | 'children' | 'pets', value: number) => {
    setGuests(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleReserve = () => {
    createReservation.mutate();
  };

  const totalGuests = guests.adults + guests.children;
  const hasValidDates = dateRange.startDate && dateRange.endDate && 
    dateRange.startDate < dateRange.endDate;

  return (
    <Card sx={{ p: 3, position: 'sticky', top: 24 }}>
      <Typography variant="h5" gutterBottom>
        ${pricePerNight} <Typography component="span" variant="body1">night</Typography>
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Box 
          onClick={handleDateClick}
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'text.primary'
            }
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
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'text.primary'
            }
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
            maxGuests={maxGuests}
            onGuestsChange={handleGuestsChange}
          />
        </Popover>
      </Box>

      <Button
        variant="contained"
        fullWidth
        color="primary"
        disabled={!hasValidDates || totalGuests === 0 || createReservation.isPending}
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
          {createReservation.error.message}
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
  );
} 