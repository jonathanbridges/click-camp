import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../lib/api';
import { QueryKeys } from '../lib/queryKeys';
import { AlertType } from '../lib/alerts';
import { rootRoute } from '../routes/__root';

interface CancelReservationDialogProps {
  open: boolean;
  onClose: () => void;
  reservationId: number;
  listingId?: number;
}

export function CancelReservationDialog({ open, onClose, reservationId, listingId }: CancelReservationDialogProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: rootRoute.id });

  const cancelReservation = useMutation({
    mutationFn: async () => {
      // Add artificial delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return api.reservations.delete(reservationId);
    },
    onSuccess: async () => {
      // Invalidate all reservations queries
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVATIONS] });
      
      // If we're on a listing page, also invalidate that listing's data
      if (listingId) {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.LISTING, listingId] });
        await queryClient.invalidateQueries();
      }
      
      // Show success alert
      navigate({
        search: () => ({ alert: AlertType.RESERVATION_DELETED }),
        replace: true
      });
      
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancel Reservation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to cancel this reservation? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={cancelReservation.isPending}>
          Keep Reservation
        </Button>
        <Button 
          onClick={() => cancelReservation.mutate()} 
          color="error" 
          variant="contained"
          disabled={cancelReservation.isPending}
          startIcon={cancelReservation.isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {cancelReservation.isPending ? 'Canceling...' : 'Yes, Cancel'}
        </Button>
      </DialogActions>
      {cancelReservation.isError && (
        <DialogContent>
          <DialogContentText color="error">
            {cancelReservation.error instanceof Error ? cancelReservation.error.message : 'Failed to cancel reservation'}
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
} 