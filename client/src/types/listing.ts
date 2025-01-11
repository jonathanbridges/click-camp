import { BaseUser } from './user';

export type Host = BaseUser;
export type Reviewer = BaseUser;

export interface Review {
  id: number;
  content: string;
  rating: number;
  reviewer: Reviewer;
  created_at: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  price_per_night: number;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  host_id: number;
  host: Host;
  photo_urls: string[];
  average_rating?: string;
  reviews?: Review[];
  unavailable_dates?: string[];
  max_guests: number;
} 