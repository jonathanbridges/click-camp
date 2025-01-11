import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, CircularProgress } from '@mui/material';
import { format, differenceInDays } from 'date-fns';
import type { Range } from 'react-date-range';

interface ReservationConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dateRange: Range;
  guestCount: number;
  pricePerNight: number;
  listingTitle: string;
  listingImage?: string;
  isPending: boolean;
  error?: Error;
}

export function ReservationConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  dateRange, 
  guestCount,
  pricePerNight,
  listingTitle,
  listingImage,
  isPending,
  error
}: ReservationConfirmDialogProps) {
  const nights = dateRange.startDate && dateRange.endDate 
    ? differenceInDays(dateRange.endDate, dateRange.startDate)
    : 0;
  const totalPrice = nights * pricePerNight;

  return (
    <Dialog 
      open={open} 
      onClose={isPending ? undefined : onClose}
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>Confirm Reservation</DialogTitle>
      <DialogContent>
        {listingImage && (
          <Box 
            component="img" 
            src={listingImage} 
            alt={listingTitle}
            sx={{ 
              width: '100%', 
              height: 200, 
              objectFit: 'cover',
              borderRadius: 1,
              mb: 2 
            }}
          />
        )}
        
        <Typography variant="h6" gutterBottom>
          {listingTitle}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            {dateRange.startDate && dateRange.endDate ? (
              `${format(dateRange.startDate, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`
            ) : (
              'Select dates'
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          py: 2,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              ${pricePerNight} × {nights} nights
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
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm}
          variant="contained"
          disabled={isPending || !dateRange.startDate || !dateRange.endDate}
          color="primary"
          startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isPending ? 'Confirming...' : 'Confirm Reservation'}
        </Button>
      </DialogActions>

      {error && (
        <DialogContent>
          <Typography color="error">
            {error.message}
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
} 