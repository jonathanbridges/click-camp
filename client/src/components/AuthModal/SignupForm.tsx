import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import type { SignupFormData, SignupFormProps } from './types';

const SignupForm = ({
  onSubmit,
  onSwitchToLogin,
  error,
  fieldErrors,
  isPending,
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
        disabled={isPending}
        {...register('username', { 
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters'
          }
        })}
        error={!!errors.username || !!fieldErrors.username}
        helperText={errors.username?.message || fieldErrors.username}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Email address"
        disabled={isPending}
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email || !!fieldErrors.email}
        helperText={errors.email?.message || fieldErrors.email}
      />
      
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        disabled={isPending}
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={!!errors.password || !!fieldErrors.password}
        helperText={errors.password?.message || fieldErrors.password}
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
        disabled={isPending}
        startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{ mt: 3, mb: 2 }}
      >
        {isPending ? 'Signing up...' : 'Sign Up'}
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{' '}
        <Button onClick={onSwitchToLogin} disabled={isPending} sx={{ textTransform: 'none' }}>
          Log in
        </Button>
      </Typography>
    </Box>
  );
};

export default SignupForm; 