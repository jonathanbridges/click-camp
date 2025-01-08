import { useEffect, useState } from 'react'
import type { Listing } from './types/listing'
import './App.css'

function App() {
  const [listings, setListings] = useState<Listing[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/listings', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setListings(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listings')
        console.error('Error fetching listings:', err)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="App">
      <h1>ClickCamp</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {listings.map(listing => (
        <div key={listing.id}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p>Price: ${listing.price_per_night}/night</p>
          <p>Location: {listing.address}, {listing.city}, {listing.state}</p>
          {listing.photo_urls && listing.photo_urls.length > 0 && (
            <img 
              src={listing.photo_urls[0]} 
              alt={listing.title} 
              style={{ maxWidth: '300px', height: 'auto' }} 
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default App
