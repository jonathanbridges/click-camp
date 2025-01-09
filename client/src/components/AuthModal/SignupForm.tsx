import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

interface SignupFormProps {
  onSubmit: (data: { email: string; username: string; password: string }) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

const SignupForm = ({ onSubmit, onSwitchToLogin, isLoading, error }: SignupFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();

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
        id="username"
        label="Username"
        autoComplete="username"
        {...register('username', { required: 'Username is required' })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
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
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </Button>
      <Typography align="center">
        Already have an account?{' '}
        <Button onClick={onSwitchToLogin} sx={{ textTransform: 'none' }}>
          Log in
        </Button>
      </Typography>
    </Box>
  );
};

export default SignupForm; 