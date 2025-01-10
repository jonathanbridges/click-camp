import { BaseUser } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  username: string;
  password: string;
}

export interface User extends BaseUser {
  email: string;
}

export interface AuthResponse {
  user: User;
}

// Re-export form data types for convenience
export type { LoginFormData, SignupFormData } from '../components/AuthModal/types'; 