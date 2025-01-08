export interface Listing {
  id: number
  title: string
  description: string
  price_per_night: number
  address: string
  city: string
  state: string
  lat?: number
  lng?: number
  active: boolean
  photo_urls?: string[]
  created_at: string
  updated_at: string
} 