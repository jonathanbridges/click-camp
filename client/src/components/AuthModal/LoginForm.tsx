import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  onSwitchToSignup: () => void;
  isLoading?: boolean;
  error?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit, onSwitchToSignup, isLoading, error }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </Button>
      <Typography align="center">
        Don't have an account?{' '}
        <Button onClick={onSwitchToSignup} sx={{ textTransform: 'none' }}>
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm; 