import { z } from 'zod';

export enum ModalMode {
  LOGIN = 'login',
  SIGNUP = 'signup',
  DEMO_LOGIN = 'demo_login',
}

export interface AuthModalProps {
  onClose: () => void;
  mode: ModalMode | null;
  onChangeMode: (mode: ModalMode | null) => void;
  onLogin: (data: LoginFormData) => Promise<void>;
  onSignup: (data: SignupFormData) => Promise<void>;
  onDemoLogin: () => Promise<void>;
  error?: string;
  fieldErrors: Record<string, string>;
  isPending: boolean;
}

export interface AuthModalControllerProps {
  onClose: () => void;
  onChangeMode: (mode: ModalMode | null) => void;
  mode: ModalMode | null;
  fieldErrors: Record<string, string>;
  displayFieldErrors: (errors: Record<string, string>) => void;
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
  fieldErrors: Record<string, string>;
  isPending: boolean;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  onSwitchToLogin: () => void;
  error?: string;
  fieldErrors: Record<string, string>;
  isPending: boolean;
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