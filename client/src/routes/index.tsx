import { Box, Container, Stack, Typography } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import SearchBar from '../components/SearchBar';
import { rootRoute } from './__root';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Stack
          sx={{
            overflow: 'hidden',
            minHeight: 'calc(100vh - 64px)',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
          }}
        >
          <Stack spacing={4} sx={{ maxWidth: 800 }}>
            <Stack spacing={2}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Camp your way.
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 400,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.4,
                }}
              >
                Tent sites, RV spots, and glamping—find the perfect site to match your camping style.
              </Typography>
            </Stack>
            <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
              <SearchBar />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 