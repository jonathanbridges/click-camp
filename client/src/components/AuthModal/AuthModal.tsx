import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ModalMode, type AuthModalProps } from './types';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import DemoLoginForm from './DemoLoginForm';

const AuthModal = ({
  onClose,
  mode,
  onChangeMode,
  onLogin,
  onSignup,
  onDemoLogin,
  error,
  fieldErrors,
  isPending,
}: AuthModalProps) => {
  return (
    <Dialog open={mode !== null} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === ModalMode.LOGIN ? 'Log in to continue' : 'Sign up to continue'}
      </DialogTitle>
      <DialogContent>
        {mode === ModalMode.DEMO_LOGIN && (
          <DemoLoginForm onComplete={onDemoLogin} />
        )}
        {mode === ModalMode.LOGIN && (
          <LoginForm
            onSubmit={onLogin}
            onSwitchToSignup={() => onChangeMode(ModalMode.SIGNUP)}
            error={error}
            fieldErrors={fieldErrors}
            isPending={isPending}
          />
        )}
        {mode === ModalMode.SIGNUP && (
          <SignupForm
            onSubmit={onSignup}
            onSwitchToLogin={() => onChangeMode(ModalMode.LOGIN)}
            error={error}
            fieldErrors={fieldErrors}
            isPending={isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 