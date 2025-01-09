import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from './AuthModal';
import type { LoginFormData, SignupFormData } from './types';

interface AuthModalControllerProps {
  open: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  isDemoLogin?: boolean;
}

const AuthModalController = ({
  open,
  onClose,
  initialMode,
  isDemoLogin = false,
}: AuthModalControllerProps) => {
  const { login, signup, demoLogin } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await demoLogin();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Demo login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await signup(data.username, data.email, data.password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Signup failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal
      open={open}
      onClose={onClose}
      mode={mode}
      onChangeMode={setMode}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onDemoLogin={handleDemoLogin}
      isLoading={isLoading}
      error={error?.message}
      isDemoLogin={isDemoLogin}
    />
  );
};

export default AuthModalController; 