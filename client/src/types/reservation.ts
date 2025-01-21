import type { Listing } from './listing';
import type { User } from './auth';

export interface Reservation {
  id: number;
  listing_id: number;
  camper_id: number;
  check_in: string;
  check_out: string;
  guest_count: number;
  listing: Listing;
  guest: User;
  created_at: string;
  updated_at: string;
}

export interface CreateReservationParams {
  listing_id: number;
  check_in: string;
  check_out: string;
  guest_count: number;
} 