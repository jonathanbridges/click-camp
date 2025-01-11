import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface GuestSelectorProps {
  adults: number;
  children: number;
  pets: number;
  maxGuests: number;
  onGuestsChange: (type: 'adults' | 'children' | 'pets', value: number) => void;
}

export function GuestSelector({ adults, children, pets, maxGuests, onGuestsChange }: GuestSelectorProps) {
  const totalGuests = adults + children;

  const handleChange = (type: 'adults' | 'children' | 'pets', increment: boolean) => {
    const currentValue = type === 'adults' ? adults : type === 'children' ? children : pets;
    const newValue = increment ? currentValue + 1 : currentValue - 1;

    if (type === 'pets') {
      if (newValue >= 0) {
        onGuestsChange(type, newValue);
      }
    } else {
      if (newValue >= 0 && (totalGuests + (increment ? 1 : -1)) <= maxGuests) {
        onGuestsChange(type, newValue);
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="subtitle1">ADULTS</Typography>
            <Typography variant="body2" color="text.secondary">Ages 13 or above</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => handleChange('adults', false)}
              disabled={adults <= 1}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{adults}</Typography>
            <IconButton 
              onClick={() => handleChange('adults', true)}
              disabled={totalGuests >= maxGuests}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="subtitle1">CHILDREN</Typography>
            <Typography variant="body2" color="text.secondary">Ages 12 or below</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => handleChange('children', false)}
              disabled={children <= 0}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{children}</Typography>
            <IconButton 
              onClick={() => handleChange('children', true)}
              disabled={totalGuests >= maxGuests}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="subtitle1">PETS</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => handleChange('pets', false)}
              disabled={pets <= 0}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{pets}</Typography>
            <IconButton 
              onClick={() => handleChange('pets', true)}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary">
        This site has a maximum of {maxGuests} guests.
      </Typography>
    </Box>
  );
} 