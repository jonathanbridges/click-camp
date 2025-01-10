import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Listing } from '../types/listing';

interface ListingParams {
  min_price?: number;
  max_price?: number;
  lat?: number;
  lng?: number;
  radius?: number;
}

interface UseListingsReturn {
  listings: Listing[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function useListings(params?: ListingParams): UseListingsReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['listings', params],
    queryFn: () => api.listings.getAll(params),
  });

  return {
    listings: data,
    isLoading,
    error: error as Error | null,
  };
} 