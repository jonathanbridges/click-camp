import type { AuthResponse, LoginCredentials, SignupCredentials, User } from '../types/auth';
import type { CreateReservationParams } from '../types/reservation';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

// Demo credentials from environment variables
const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;

if (!DEMO_EMAIL || !DEMO_PASSWORD) {
  console.error('Demo credentials not found in environment variables');
}

// Type-safe API functions
export const api = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed. Please try again later.');
      }

      return response.json();
    },

    demoLogin: async (): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Demo login failed. Please try again later.');
      }

      return response.json();
    },

    signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ user: credentials }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Signup failed. Please try again later.');
      }

      return response.json();
    },

    getCurrentUser: async (): Promise<User | null> => {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        throw new Error('Failed to fetch current user');
      }

      return response.json();
    },

    logout: async (): Promise<void> => {
      const response = await fetch(`${API_URL}/session`, {
        method: 'DELETE',
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    },
  },

  listings: {
    getAll: async (params?: {
      min_price?: number;
      max_price?: number;
      lat?: number;
      lng?: number;
      radius?: number;
    }) => {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }

      const url = `${API_URL}/listings${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const response = await fetch(url, {
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      return response.json();
    },

    getOne: async (id: number) => {
      const response = await fetch(`${API_URL}/listings/${id}`, {
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listing');
      }

      return response.json();
    },

    create: async (listing: any) => {
      const response = await fetch(`${API_URL}/listings`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ listing }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      return response.json();
    },
  },

  reservations: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/reservations`, {
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      return response.json();
    },

    create: async (params: CreateReservationParams) => {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ reservation: params }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      return response.json();
    },

    delete: async (id: number) => {
      const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }
    },

    getForListing: async (listingId: number) => {
      const response = await fetch(`${API_URL}/reservations?listing_id=${listingId}`, {
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reservations for listing');
      }

      return response.json();
    },
  },
}; 