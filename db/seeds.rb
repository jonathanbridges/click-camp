# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.delete_all
Location.delete_all
Listing.delete_all

User.create!(
  username: 'jonathan',
  email: 'jbridges7@gmail.com',
  password: 'password'
)

User.create!(
  username: 'clickCamper',
  email: 'clickCamper@camp.site',
  password: 'password'
)

host1 = User.create!(
  username: 'Slide R.',
  email: 'abc@123.com',
  password: 'password'
)

host2 = User.create!(
  username: 'Jeff B.',
  email: 'def@123.com',
  password: 'password'
)

host3 = User.create!(
  username: 'Judy M.',
  email: 'ghi@123.com',
  password: 'password'
)

host4 = User.create!(
  username: 'Carol P.',
  email: 'jkl@123.com',
  password: 'password'
)

location1 = Location.create!(
  lat: 37.775769,
  long: -122.434960
)

location2 = Location.create!(
  lat: 37.779760,
  long: -122.413820,
)

location3 = Location.create!(
  lat: 37.769996,
  long: -122.511281
)

location4 = Location.create!(
  lat: 37.897000,
  long: -122.581111
)

listing1 = Listing.create!(
  host_id: host1.id, 
  location_id: location1.id, 
  name: 'Aurora HOA', 
  description: 'Experience the best camping in northern CA! All campsites have fire pits and unparalled access to star-viewing.',
  cost: 45
)

# listing1.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-1-1.jpeg"), filename: "site-1-1.jpeg")
listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-1.jpeg'), filename: "site-1-1.jpeg")


listing2 = Listing.create!(
  host_id: host2.id, 
  location_id: location2.id, 
  name: 'Marshmellow Marsh', 
  description: 'Free smores are delivered upon your arrival at Marshmellow Marsh! A quick walk to the bog esplanade.',
  cost: 25
)

# listing2.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-2-1.jpeg"), filename: "site-2-1.jpeg")
listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-1.jpeg'), filename: "site-2-1.jpeg")


listing3 = Listing.create!(
  host_id: host3.id, 
  location_id: location3.id, 
  name: 'Hammock Forest', 
  description: 'Relax to the max hanging out between two trees in hammock forest! Sheep are available for petting and Instagram moments.',
  cost: 65
)

# listing3.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-3-1.jpeg"), filename: "site-3-1.jpeg")
listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-1.jpeg'), filename: "site-3-1.jpeg")


listing4 = Listing.create!(
  host_id: host3.id, 
  location_id: location3.id, 
  name: 'Wine Country Wagons', 
  description: 'Rose by day, and hay by night. Drink the finest north bay wines and sleep in our premium wooden wagons.',
  cost: 75
)

# listing4.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-4-1.jpeg"), filename: "site-4-1.jpeg")
listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-1.jpeg'), filename: "site-4-1.jpeg")


listing5 = Listing.create!(
  host_id: host4.id, 
  location_id: location4.id, 
  name: 'Beachside Bungalow', 
  description: 'Whalewatchers delight! Free binoculars, travel guidebooks from the 1980s, and a grand view of the Pacific Ocean.',
  cost: 45
)

# listing5.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-5-1.jpeg"), filename: "site-5-1.jpeg")
listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-1.jpeg'), filename: "site-5-1.jpeg")


listing6 = Listing.create!(
  host_id: host4.id, 
  location_id: location4.id, 
  name: 'Leaning Leanto', 
  description: 'Charming leanto nearly untouched by mankind. Enjoy the sounds of coyotes rummaging through your dry goods for a snack.',
  cost: 25
)

# listing6.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-6-1.jpeg"), filename: "site-6-1.jpeg")
listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-1.jpeg'), filename: "site-6-1.jpeg")
