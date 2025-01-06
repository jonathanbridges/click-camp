# Clear existing data
puts "Clearing existing data..."
Review.destroy_all
Reservation.destroy_all
Listing.destroy_all
User.destroy_all

# Create users
puts "Creating users..."
host = User.create!(
  username: "superhost",
  email: "host@example.com",
  password: "password123",
  is_host: true
)

5.times do |i|
  User.create!(
    username: "camper#{i}",
    email: "camper#{i}@example.com",
    password: "password123"
  )
end

# Create listings
puts "Creating listings..."
locations = [
  {
    city: "Big Sur",
    state: "CA",
    lat: 36.2704,
    lng: -121.8081
  },
  {
    city: "Yosemite",
    state: "CA",
    lat: 37.8651,
    lng: -119.5383
  }
]

locations.each do |location|
  Listing.create!(
    host: host,
    title: "Beautiful Campsite in #{location[:city]}",
    description: "Experience nature at its finest...",
    price_per_night: rand(50..200),
    address: "123 Forest Road",
    city: location[:city],
    state: location[:state],
    lat: location[:lat],
    lng: location[:lng]
  )
end

# Create reservations and reviews
puts "Creating reservations and reviews..."
User.where(is_host: false).each do |camper|
  reservation = Reservation.create!(
    camper: camper,
    listing: Listing.all.sample,
    check_in: Date.today + rand(10..30),
    check_out: Date.today + rand(31..40),
    guest_count: rand(1..4),
    total_price: rand(100..1000),
    status: 'confirmed'
  )

  Review.create!(
    user: camper,
    listing: reservation.listing,
    reservation: reservation,
    rating: rand(3..5),
    content: "Had a great time camping here!"
  )
end

puts "Seed data created successfully!"