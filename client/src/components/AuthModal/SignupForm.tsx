import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { SignupFormData, SignupFormProps } from './types';

const SignupForm = ({
  onSubmit,
  onSwitchToLogin,
  error,
}: SignupFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Create an account to start camping.
      </Typography>
      
      <TextField
        margin="normal"
        fullWidth
        label="Username"
        {...register('username', { 
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters'
          }
        })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

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
        Sign Up
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{' '}
        <Button onClick={onSwitchToLogin} sx={{ textTransform: 'none' }}>
          Log in
        </Button>
      </Typography>
    </Box>
  );
};

export default SignupForm; 