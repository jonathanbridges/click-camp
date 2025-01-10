import { useState } from 'react';
import { rootRoute } from '../../routes/__root';
import AuthModal from './AuthModal';
import type { LoginFormData, SignupFormData } from './types';
import { QueryKeys } from '../../lib/queryKeys';

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
  const { auth: { login, signup, demoLogin }, queryClient } = rootRoute.useRouteContext();
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data.email, data.password);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    try {
      await demoLogin();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Demo login failed'));
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setError(null);
    try {
      await signup(data.username, data.email, data.password);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Signup failed'));
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
      error={error?.message}
      isDemoLogin={isDemoLogin}
    />
  );
};

export default AuthModalController; 