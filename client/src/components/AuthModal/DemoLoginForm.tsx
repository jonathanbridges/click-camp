import { rootRoute } from '../../routes/__root';
import { Box, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

// Define demo credentials outside component to ensure stability
const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL ?? 'demo@example.com';
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD ?? 'demo123';

// Animation timing constants
const TYPE_DELAY = 50;
const FIELD_TRANSITION_DELAY = 300;

interface DemoLoginFormProps {
  /** Callback function to execute when the login is successful */
  onComplete: () => void;
}

/**
 * A form component that demonstrates auto-typing animation for demo login credentials.
 * It sequentially types out an email and password, then attempts to log in.
 * 
 * The sequence follows these steps:
 * 1. Types out the email character by character
 * 2. Moves to password field and types it out
 * 3. Attempts login with the demo credentials
 * 4. Calls onComplete if login is successful
 */
const DemoLoginForm = ({ onComplete }: DemoLoginFormProps) => {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [sequence, setSequence] = useState<'email' | 'password' | 'complete'>('email');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { auth: { demoLogin } } = rootRoute.useRouteContext();

  const startPasswordSequence = useCallback(() => {
    setSequence('password');
  }, []);

  /**
   * Attempts to log in with the demo credentials
   */
  const completeSequence = useCallback(async () => {
    setSequence('complete');
    setIsLoading(true);
    try {
      await demoLogin();
      timeoutRef.current = setTimeout(onComplete, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [demoLogin, onComplete]);

  // Type out email
  useEffect(() => {
    if (sequence !== 'email') return;

    const typeEmail = () => {
      setEmailText(prev => {
        const nextIndex = prev.length;
        if (nextIndex < DEMO_EMAIL.length) {
          timeoutRef.current = setTimeout(typeEmail, TYPE_DELAY);
          return DEMO_EMAIL.slice(0, nextIndex + 1);
        } else {
          timeoutRef.current = setTimeout(startPasswordSequence, FIELD_TRANSITION_DELAY);
          return prev;
        }
      });
    };

    timeoutRef.current = setTimeout(typeEmail, FIELD_TRANSITION_DELAY);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sequence, startPasswordSequence]);

  // Type out password
  useEffect(() => {
    if (sequence !== 'password') return;

    const typePassword = () => {
      setPasswordText(prev => {
        const nextIndex = prev.length;
        if (nextIndex < DEMO_PASSWORD.length) {
          timeoutRef.current = setTimeout(typePassword, TYPE_DELAY);
          return DEMO_PASSWORD.slice(0, nextIndex + 1);
        } else {
          timeoutRef.current = setTimeout(completeSequence, FIELD_TRANSITION_DELAY);
          return prev;
        }
      });
    };

    timeoutRef.current = setTimeout(typePassword, FIELD_TRANSITION_DELAY);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sequence, completeSequence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Welcome back! Let's get you outside.
      </Typography>
      
      <TextField
        margin="normal"
        fullWidth
        label="Email address"
        value={emailText}
        autoComplete="email"
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: sequence === 'email' ? '|' : undefined
          }
        }}
      />
      
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={passwordText}
        autoComplete="current-password"
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: sequence === 'password' ? '|' : undefined
          }
        }}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {isLoading && sequence === 'complete' && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Logging in...
        </Typography>
      )}
    </Box>
  );
};

export default DemoLoginForm; 