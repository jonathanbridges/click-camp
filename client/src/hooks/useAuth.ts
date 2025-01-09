import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export function useAuth() {
  const queryClient = useQueryClient();
  const [isEnabled, setIsEnabled] = useState(true);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      console.log('Fetching current user...');
      try {
        const user = await api.auth.getCurrentUser();
        console.log('Current user fetch result:', user);
        return user;
      } catch (err) {
        console.log('Error fetching current user:', err);
        if (err instanceof Error && err.message === 'Not authenticated') {
          return null;
        }
        throw err;
      }
    },
    retry: false,
    refetchOnWindowFocus: true,
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    console.log('Auth state:', { isLoading, user, isEnabled });
  }, [isLoading, user, isEnabled]);

  const login = async (email: string, password: string) => {
    const response = await api.auth.login({ email, password });
    queryClient.setQueryData(['currentUser'], response.user);
    setIsEnabled(true);
    return response;
  };

  const demoLogin = async () => {
    const response = await api.auth.demoLogin();
    queryClient.setQueryData(['currentUser'], response.user);
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    setIsEnabled(true);
    return response;
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await api.auth.signup({ username, email, password });
    queryClient.setQueryData(['currentUser'], response.user);
    setIsEnabled(true);
    return response;
  };

  const logout = async () => {
    await api.auth.logout();
    queryClient.setQueryData(['currentUser'], null);
    setIsEnabled(false);
  };

  return {
    user,
    isLoading,
    error,
    login,
    demoLogin,
    signup,
    logout,
    isAuthenticated: !!user,
  };
} 