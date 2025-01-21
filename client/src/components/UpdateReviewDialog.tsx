import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    TextField,
    Typography
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { AlertType } from '../lib/alerts';
import type { Review } from '../lib/api';
import { api } from '../lib/api';
import { QueryKeys } from '../lib/queryKeys';
import type { Listing } from '../types/listing';

interface UpdateReviewDialogProps {
  open: boolean;
  onClose: () => void;
  review: Review;
  listing: Listing;
}

export function UpdateReviewDialog({ 
  open, 
  onClose,
  review,
  listing
}: UpdateReviewDialogProps) {
  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1500));

      return api.reviews.update(review.id, {
        rating,
        content,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LISTING, listing.id] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.RESERVATIONS] });
      await navigate({
        to: `/listing/${listing.id}`,
        search: { alert: AlertType.REVIEW_UPDATED }
      });
      onClose();
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  const isValid = rating !== null && content.length >= 10 && content.length <= 1000;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Update your review</DialogTitle>
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
            onChange={(_, newValue) => setRating(newValue ?? 0)}
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
          onClick={onClose}
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
          {isPending ? 'Updating...' : 'Update Review'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 