import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  TextField,
  Rating,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../lib/api';
import { AlertType } from '../lib/alerts';
import type { Listing } from '../types/listing';
import { QueryKeys } from '../lib/queryKeys';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  listing: Listing;
  reservationId: number;
}

export function ReviewDialog({ 
  open, 
  onClose,
  listing,
  reservationId,
}: ReviewDialogProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      if (rating === null) throw new Error('Rating is required');
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));

      return api.reviews.create(listing.id, {
        rating,
        content,
        reservation_id: reservationId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LISTING, listing.id] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVATIONS] });
      handleClose();
      navigate({
        to: `/listing/${listing.id}`,
        search: { alert: AlertType.REVIEW_CREATED }
      });
    },
  });

  const handleClose = () => {
    if (!isPending) {
      setRating(null);
      setContent('');
      onClose();
    }
  };

  const handleSubmit = () => {
    mutate();
  };

  const isValid = rating !== null && content.length >= 10 && content.length <= 1000;

  return (
    <Dialog 
      open={open} 
      onClose={isPending ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Review your stay</DialogTitle>
      <DialogContent>
        {listing.photo_urls?.[0] && (
          <Box 
            component="img" 
            src={listing.photo_urls[0]} 
            alt={listing.title}
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
          {listing.title}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            disabled={isPending}
            size="large"
          />
        </Box>

        <TextField
          label="Review"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          disabled={isPending}
          error={content.length > 0 && (content.length < 10 || content.length > 1000)}
          helperText={content.length > 0 && (content.length < 10 || content.length > 1000) 
            ? "Review must be between 10 and 1000 characters" 
            : undefined}
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error.message}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={handleClose}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending || !isValid}
          color="primary"
          startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 