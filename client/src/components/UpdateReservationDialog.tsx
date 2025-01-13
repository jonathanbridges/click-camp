import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, CircularProgress } from '@mui/material';
import { format, differenceInDays } from 'date-fns';
import { useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../lib/api';
import { QueryKeys } from '../lib/queryKeys';
import { AlertType } from '../lib/alerts';
import { rootRoute } from '../routes/__root';
import { GuestSelector } from './ReservationCard/GuestSelector';
import type { Reservation } from '../types/reservation';

interface UpdateReservationDialogProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
}

export function UpdateReservationDialog({ open, onClose, reservation }: UpdateReservationDialogProps) {
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(reservation.check_in),
    endDate: new Date(reservation.check_out),
    key: 'selection',
  });
  const [guests, setGuests] = useState({
    adults: reservation.guest_count,
    children: 0,
    pets: 0
  });
  
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: rootRoute.id });

  const updateReservation = useMutation({
    mutationFn: async () => {
      if (!dateRange.startDate || !dateRange.endDate) {
        throw new Error('Please select dates');
      }

      const totalGuests = guests.adults + guests.children;
      if (totalGuests < 1) {
        throw new Error('Please add at least one guest');
      }

      // Add artificial delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      return api.reservations.update(reservation.id, {
        check_in: format(dateRange.startDate, 'yyyy-MM-dd'),
        check_out: format(dateRange.endDate, 'yyyy-MM-dd'),
        guest_count: totalGuests,
      });
    },
    onSuccess: async () => {
      // Invalidate all reservations queries
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVATIONS] });
      
      // If we're on a listing page, also invalidate that listing's data
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LISTING, reservation.listing_id] });
      
      // Show success alert
      navigate({
        search: () => ({ alert: AlertType.RESERVATION_UPDATED }),
        replace: true
      });
      
      onClose();
    },
  });

  const nights = dateRange.startDate && dateRange.endDate 
    ? differenceInDays(dateRange.endDate, dateRange.startDate)
    : 0;
  const totalPrice = nights * reservation.listing.price_per_night;
  const totalGuests = guests.adults + guests.children;

  // Function to check if a date should be disabled
  const isDateBlocked = (date: Date) => {
    // Disable dates before today
    if (date < new Date()) return true;

    // Convert unavailable dates strings to Date objects
    const disabledDates = reservation.listing.unavailable_dates?.map(date => new Date(date)) || [];

    // Check if date is in unavailable dates
    return disabledDates.some(unavailableDate => 
      date.getFullYear() === unavailableDate.getFullYear() &&
      date.getMonth() === unavailableDate.getMonth() &&
      date.getDate() === unavailableDate.getDate()
    );
  };

  const handleGuestsChange = (type: 'adults' | 'children' | 'pets', value: number) => {
    setGuests(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <Dialog 
      open={open} 
      onClose={updateReservation.isPending ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Update Reservation</DialogTitle>
      <DialogContent>
        {reservation.listing.photo_urls?.[0] && (
          <Box 
            component="img" 
            src={reservation.listing.photo_urls[0]} 
            alt={reservation.listing.title}
            sx={{ 
              width: '100%', 
              height: 150,
              objectFit: 'cover',
              borderRadius: 1,
              mb: 2 
            }}
          />
        )}
        
        <Typography variant="h6" gutterBottom>
          {reservation.listing.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Select Dates
          </Typography>
          <Box sx={{ 
            '.rdrMonth': {
              width: '100%',
              padding: '0px',
            },
            '.rdrCalendarWrapper': {
              width: '100%',
              fontSize: '14px',
            },
            '.rdrDateDisplayWrapper': {
              backgroundColor: 'transparent',
            },
          }}>
            <DateRange
              ranges={[dateRange]}
              onChange={item => setDateRange(item.selection)}
              minDate={new Date()}
              months={1}
              direction="horizontal"
              disabledDay={isDateBlocked}
              showMonthAndYearPickers={true}
              showDateDisplay={false}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
            <Typography variant="subtitle2">
              Guests
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalGuests} guest{totalGuests !== 1 ? 's' : ''} (max {reservation.listing.max_guests})
            </Typography>
          </Box>
          <GuestSelector
            adults={guests.adults}
            children={guests.children}
            pets={guests.pets}
            maxGuests={reservation.listing.max_guests}
            onGuestsChange={handleGuestsChange}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          py: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              ${reservation.listing.price_per_night} × {nights} nights
            </Typography>
            <Typography>
              ${totalPrice}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <Typography fontWeight="bold">
              Total
            </Typography>
            <Typography fontWeight="bold">
              ${totalPrice}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={onClose}
          disabled={updateReservation.isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => updateReservation.mutate()}
          variant="contained"
          disabled={updateReservation.isPending || !dateRange.startDate || !dateRange.endDate || totalGuests < 1}
          color="primary"
          startIcon={updateReservation.isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {updateReservation.isPending ? 'Updating...' : 'Update Reservation'}
        </Button>
      </DialogActions>

      {updateReservation.isError && (
        <DialogContent>
          <Typography color="error">
            {updateReservation.error instanceof Error ? updateReservation.error.message : 'Failed to update reservation'}
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
} 