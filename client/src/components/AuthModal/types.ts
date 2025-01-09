import { z } from 'zod';

export type AuthMode = 'login' | 'signup';

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  isDemoLogin?: boolean;
  mode: AuthMode;
  onChangeMode: (mode: AuthMode) => void;
  onLogin: (data: { email: string; password: string }) => void;
  onSignup: (data: { email: string; username: string; password: string }) => void;
  onDemoLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface AuthModalControllerProps {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  isDemoLogin?: boolean;
}

// Form schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

// Form component props
export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onSwitchToSignup: () => void;
  isLoading?: boolean;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
} 