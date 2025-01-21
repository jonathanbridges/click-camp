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

async function handleApiError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (data.error) {
      return data.error;
    }
    if (data.errors) {
      return Object.values(data.errors).flat().join(', ');
    }
    return `Request failed with status ${response.status}`;
  } catch (e) {
    return `Request failed with status ${response.status}`;
  }
}

export interface CreateReviewRequest {
  rating: number;
  content: string;
  reservation_id: number;
}

export interface Review {
  id: number;
  content: string;
  rating: number;
  reviewer: {
    id: number;
    username: string;
  };
  created_at: string;
  listing_id: number;
}

export interface ListingsSearchParams {
  originLat?: number;
  originLng?: number;
  neLat?: number;
  neLng?: number;
  swLat?: number;
  swLng?: number;
}

// Type-safe API functions
export const api = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          throw new Error(errorData.error);
        }
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
        const errorData = await response.json();
        if (errorData.error) {
          throw new Error(errorData.error);
        }
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
        const errorData = await response.json();
        if (errorData.errors) {
          // Convert API error format to form errors
          const formErrors: Record<string, string> = {};
          Object.entries(errorData.errors).forEach(([field, messages]) => {
            formErrors[field] = Array.isArray(messages) ? messages[0] : messages;
          });
          throw new Error(JSON.stringify(formErrors));
        }
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
    getAll: async (params?: ListingsSearchParams) => {
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
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(await handleApiError(response));
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

    update: async (id: number, params: Partial<CreateReservationParams>) => {
      const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: 'PATCH',
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ reservation: params }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reservation');
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

  reviews: {
    create: async (listingId: number, data: CreateReviewRequest): Promise<Review> => {
      const response = await fetch(`${API_URL}/listings/${listingId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: data }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(await handleApiError(response));
      }

      return response.json();
    },

    list: async (listingId: number): Promise<Review[]> => {
      const response = await fetch(`${API_URL}/listings/${listingId}/reviews`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(await handleApiError(response));
      }

      return response.json();
    },

    update: async (reviewId: number, data: Omit<CreateReviewRequest, 'reservation_id'>): Promise<Review> => {
      const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: defaultHeaders,
        body: JSON.stringify({ review: data }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(await handleApiError(response));
      }

      return response.json();
    },

    delete: async (reviewId: number): Promise<void> => {
      const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: defaultHeaders,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(await handleApiError(response));
      }
    },
  },
}; 