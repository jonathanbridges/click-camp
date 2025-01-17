import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Listing } from '../../types/listing';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from '@tanstack/react-router';
import ImageCarousel from '../ImageCarousel';

interface ListingPopupProps {
  listing: Listing;
  onClose: () => void;
}

export default function ListingPopup({ listing, onClose }: ListingPopupProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate({ to: '/listing/$listingId', params: { listingId: listing.id.toString() } });
  };

  const formattedRating = listing.average_rating > 0 
    ? listing.average_rating.toFixed(1) 
    : 'New';

  return (
    <Card 
      sx={{ 
        width: 300,
        maxWidth: '100%',
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
    >
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
          zIndex: 1,
        }}
        size="small"
      >
        <CloseIcon />
      </IconButton>

      <ImageCarousel 
        images={listing.photo_urls} 
        height={200}
        onImageClick={handleCardClick}
      />

      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {listing.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <StarIcon sx={{ color: 'primary.main', fontSize: '1rem', mr: 0.5 }} />
          <Typography variant="body2" color="text.primary" sx={{ mr: 0.5 }}>
            {formattedRating}
          </Typography>
          {listing.review_count > 0 && (
            <Typography variant="body2" color="text.secondary">
              ({listing.review_count} {listing.review_count === 1 ? 'review' : 'reviews'})
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {listing.city}, {listing.state}
        </Typography>
        <Typography variant="h6" color="primary">
          ${listing.price_per_night}/night
        </Typography>
      </CardContent>
    </Card>
  );
} 