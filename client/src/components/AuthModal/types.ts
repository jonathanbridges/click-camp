import { z } from 'zod';

export type AuthMode = 'login' | 'signup';

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onChangeMode: (mode: 'login' | 'signup') => void;
  onLogin: (data: LoginFormData) => Promise<void>;
  onSignup: (data: SignupFormData) => Promise<void>;
  onDemoLogin: () => Promise<void>;
  error?: string;
  isDemoLogin?: boolean;
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

// Form component props
export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onSwitchToSignup: () => void;
  error?: string;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  onSwitchToLogin: () => void;
  error?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
} 