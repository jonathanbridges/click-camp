import { useQuery } from '@tanstack/react-query';
import type { Listing } from '../types/listing';
import { api } from '../lib/api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const listing = await api.listings.getOne(parseInt(id));
      if (listing.host?.avatar_url && listing.host.avatar_url.startsWith('/')) {
        listing.host.avatar_url = `${API_URL}${listing.host.avatar_url}`;
      }
      return listing;
    },
  });
} 