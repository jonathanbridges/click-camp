import { Component, ReactNode } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  handleRetry = () => {
    // Reset error state
    this.setState({ hasError: false, error: undefined });
    // Reload the current route
    window.location.reload();
  };

  handleGoHome = () => {
    // Reset error state and navigate home
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 2,
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" color="error">
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshRounded />}
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
            <Button
              variant="contained"
              onClick={this.handleGoHome}
            >
              Return Home
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
} 