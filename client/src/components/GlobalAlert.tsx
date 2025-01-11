import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { rootRoute } from '../routes/__root';

interface GlobalAlertProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export function GlobalAlert({ open, message, severity }: GlobalAlertProps) {
  const navigate = useNavigate({ from: rootRoute.id });

  const handleClose = () => {
    navigate({
      search: () => ({ alert: undefined }),
      replace: true
    });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
} 