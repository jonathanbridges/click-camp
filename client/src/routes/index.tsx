import { Box, Container, Typography } from '@mui/material';
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom>
          Welcome to ClickCamp
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Find your next outdoor adventure
        </Typography>
      </Box>
    </Container>
  );
} 