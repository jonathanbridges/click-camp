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
  lat?: number;
  lng?: number;
  active: boolean;
  photo_urls?: string[];
  host?: Host;
  reviews?: Review[];
  average_rating?: number;
  created_at: string;
  updated_at: string;
} 