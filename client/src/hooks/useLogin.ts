import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthResponse, LoginCredentials } from '../types/auth';
import { api } from '../lib/api';

/**
 * Custom hook for handling user login functionality
 * Uses TanStack Query for mutation handling
 * 
 * @returns {Object} Login mutation object
 * @property {Function} login - Function to trigger login
 * @property {boolean} isLoading - Whether login request is in progress
 * @property {Error | null} error - Error object if login failed
 * @property {boolean} isError - Whether there was an error during login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: api.auth.login,
    onSuccess: (data) => {
      // Update the currentUser query with the new user data
      queryClient.setQueryData(['currentUser'], data.user);
      // Invalidate the query to ensure we have fresh data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}; 