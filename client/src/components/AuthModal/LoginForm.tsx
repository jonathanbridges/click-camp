import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { LoginFormData, LoginFormProps } from './types';

const LoginForm = ({
  onSubmit,
  onSwitchToSignup,
  error,
}: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Welcome back! Let's get you outside.
      </Typography>
      
      <TextField
        margin="normal"
        fullWidth
        label="Email address"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log In
      </Button>

      <Typography variant="body2" align="center">
        Don't have an account?{' '}
        <Button onClick={onSwitchToSignup} sx={{ textTransform: 'none' }}>
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm; 