import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { AuthModalProps } from './types';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import DemoLoginForm from './DemoLoginForm';

const AuthModal = ({
  open,
  onClose,
  mode,
  onChangeMode,
  onLogin,
  onSignup,
  onDemoLogin,
  error,
  isDemoLogin,
}: AuthModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'login' ? 'Log in to continue' : 'Sign up to continue'}
      </DialogTitle>
      <DialogContent>
        {mode === 'login' ? (
          isDemoLogin ? (
            <DemoLoginForm onComplete={onDemoLogin} />
          ) : (
            <LoginForm
              onSubmit={onLogin}
              onSwitchToSignup={() => onChangeMode('signup')}
              error={error}
            />
          )
        ) : (
          <SignupForm
            onSubmit={onSignup}
            onSwitchToLogin={() => onChangeMode('login')}
            error={error}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 