import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AlertType } from '../lib/alerts';
import { api } from '../lib/api';

interface DeleteReviewDialogProps {
  open: boolean;
  onClose: () => void;
  reviewId: number;
  listingId: number;
}

export function DeleteReviewDialog({ 
  open, 
  onClose, 
  reviewId, 
  listingId 
}: DeleteReviewDialogProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteReview = useMutation({
    mutationFn: async () => {
      // Add artificial delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return api.reviews.delete(reviewId);
    },
    onSuccess: async () => {
      // Invalidate listing data to refresh reviews
      queryClient.invalidateQueries({ queryKey: ['listing', listingId] });
      
      // Show success alert
      navigate({
        search: () => ({ alert: AlertType.REVIEW_DELETED }),
        replace: true
      });
      
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this review? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteReview.isPending}>
          Keep Review
        </Button>
        <Button 
          onClick={() => deleteReview.mutate()} 
          color="error" 
          variant="contained"
          disabled={deleteReview.isPending}
          startIcon={deleteReview.isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {deleteReview.isPending ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </DialogActions>
      {deleteReview.isError && (
        <DialogContent>
          <DialogContentText color="error">
            {deleteReview.error instanceof Error ? deleteReview.error.message : 'Failed to delete review'}
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
} 