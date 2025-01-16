import { useState } from 'react';
import { QueryKeys } from '../../lib/queryKeys';
import { rootRoute } from '../../routes/__root';
import AuthModal from './AuthModal';
import type { AuthModalControllerProps, LoginFormData, SignupFormData, ModalMode } from './types';

const AuthModalController = ({
  onClose,
  mode,
  onChangeMode,
  fieldErrors,
  displayFieldErrors,
}: AuthModalControllerProps) => {
  const { auth: { login, signup, demoLogin }, queryClient } = rootRoute.useRouteContext();
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleModeChange = (newMode: ModalMode | null) => {
    setError(null);
    displayFieldErrors({});
    onChangeMode(newMode);
  };

  const handleLogin = async (data: LoginFormData) => {
    setError(null);
    displayFieldErrors({});
    setIsPending(true);
    try {
      await login(data);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        try {
          const parsedErrors = JSON.parse(err.message);
          displayFieldErrors(parsedErrors);
        } catch {
          setError(err);
        }
      } else {
        setError(new Error('Login failed'));
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setIsPending(true);
    try {
      await demoLogin();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Demo login failed'));
    } finally {
      setIsPending(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setError(null);
    setIsPending(true);
    try {
      await signup(data);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        try {
          // Try to parse the error message as JSON containing field errors
          const parsedErrors = JSON.parse(err.message);
          displayFieldErrors(parsedErrors);
        } catch {
          // If parsing fails, treat it as a general error
          setError(err);
        }
      } else {
        setError(new Error('Signup failed'));
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthModal
      onClose={onClose}
      mode={mode}
      onChangeMode={handleModeChange}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onDemoLogin={handleDemoLogin}
      error={error?.message}
      fieldErrors={fieldErrors}
      isPending={isPending}
    />
  );
};

export default AuthModalController; 