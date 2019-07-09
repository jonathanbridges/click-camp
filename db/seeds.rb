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

photo_1_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-1.jpeg')
listing1.photos.attach(io: photo_1_1, filename: "site-1-1.jpeg")
photo_1_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-2.jpeg')
listing1.photos.attach(io: photo_1_2, filename: "site-1-2.jpeg")
photo_1_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-3.jpeg')
listing1.photos.attach(io: photo_1_3, filename: "site-1-3.jpeg")
photo_1_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-4.jpeg')
listing1.photos.attach(io: photo_1_4, filename: "site-1-4.jpeg")
photo_1_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-5.jpeg')
listing1.photos.attach(io: photo_1_5, filename: "site-1-5.jpeg")
photo_1_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-6.jpeg')
listing1.photos.attach(io: photo_1_6, filename: "site-1-6.jpeg")

# listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-1.jpeg'), filename: "site-1-1.jpeg")
# listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-2.jpeg'), filename: "site-1-2.jpeg")
# listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-3.jpeg'), filename: "site-1-3.jpeg")
# listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-4.jpeg'), filename: "site-1-4.jpeg")
# listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-5.jpeg'), filename: "site-1-5.jpeg")
# listing1.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-6.jpeg'), filename: "site-1-6.jpeg")


listing2 = Listing.create!(
  host_id: host2.id, 
  location_id: location2.id, 
  name: 'Marshmellow Marsh', 
  description: 'Free smores are delivered upon your arrival at Marshmellow Marsh! A quick walk to the bog esplanade.',
  cost: 25
)

photo_2_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-1.jpeg')
listing2.photos.attach(io: photo_2_1, filename: "site-2-1.jpeg")
photo_2_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-2.jpeg')
listing2.photos.attach(io: photo_2_2, filename: "site-2-2.jpeg")
photo_2_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-3.jpeg')
listing2.photos.attach(io: photo_2_3, filename: "site-2-3.jpeg")
photo_2_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-4.jpeg')
listing2.photos.attach(io: photo_2_4, filename: "site-2-4.jpeg")
photo_2_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-5.jpeg')
listing2.photos.attach(io: photo_2_5, filename: "site-2-5.jpeg")
photo_2_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-6.jpeg')
listing2.photos.attach(io: photo_2_6, filename: "site-2-6.jpeg")

# listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-1.jpeg'), filename: "site-2-1.jpeg")
# listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-2.jpeg'), filename: "site-2-2.jpeg")
# listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-3.jpeg'), filename: "site-2-3.jpeg")
# listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-4.jpeg'), filename: "site-2-4.jpeg")
# listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-5.jpeg'), filename: "site-2-5.jpeg")
# listing2.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-6.jpeg'), filename: "site-2-6.jpeg")


listing3 = Listing.create!(
  host_id: host3.id, 
  location_id: location3.id, 
  name: 'Hammock Forest', 
  description: 'Relax to the max hanging out between two trees in hammock forest! Sheep are available for petting and Instagram moments.',
  cost: 65
)

photo_3_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-1.jpeg')
listing3.photos.attach(io: photo_3_1, filename: "site-3-1.jpeg")
photo_3_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-2.jpeg')
listing3.photos.attach(io: photo_3_2, filename: "site-3-2.jpeg")
photo_3_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-3.jpeg')
listing3.photos.attach(io: photo_3_3, filename: "site-3-3.jpeg")
photo_3_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-4.jpeg')
listing3.photos.attach(io: photo_3_4, filename: "site-3-4.jpeg")
photo_3_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-5.jpeg')
listing3.photos.attach(io: photo_3_5, filename: "site-3-5.jpeg")
photo_3_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-6.jpeg')
listing3.photos.attach(io: photo_3_6, filename: "site-3-6.jpeg")

# listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-1.jpeg'), filename: "site-3-1.jpeg")
# listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-2.jpeg'), filename: "site-3-2.jpeg")
# listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-3.jpeg'), filename: "site-3-3.jpeg")
# listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-4.jpeg'), filename: "site-3-4.jpeg")
# listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-5.jpeg'), filename: "site-3-5.jpeg")
# listing3.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-6.jpeg'), filename: "site-3-6.jpeg")

listing4 = Listing.create!(
  host_id: host3.id, 
  location_id: location3.id, 
  name: 'Wine Country Wagons', 
  description: 'Rose by day, and hay by night. Drink the finest north bay wines and sleep in our premium wooden wagons.',
  cost: 75
)

photo_4_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-1.jpeg')
listing4.photos.attach(io: photo_4_1, filename: "site-4-1.jpeg")
photo_4_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-2.jpeg')
listing4.photos.attach(io: photo_4_2, filename: "site-4-2.jpeg")
photo_4_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-3.jpeg')
listing4.photos.attach(io: photo_4_3, filename: "site-4-3.jpeg")
photo_4_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-4.jpeg')
listing4.photos.attach(io: photo_4_4, filename: "site-4-4.jpeg")
photo_4_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-5.jpeg')
listing4.photos.attach(io: photo_4_5, filename: "site-4-5.jpeg")
photo_4_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-6.jpeg')
listing4.photos.attach(io: photo_4_6, filename: "site-4-6.jpeg")

# listing4.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-4-1.jpeg"), filename: "site-4-1.jpeg")
# listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-1.jpeg'), filename: "site-4-1.jpeg")
# listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-2.jpeg'), filename: "site-4-2.jpeg")
# listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-3.jpeg'), filename: "site-4-3.jpeg")
# listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-4.jpeg'), filename: "site-4-4.jpeg")
# listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-5.jpeg'), filename: "site-4-5.jpeg")
# listing4.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-6.jpeg'), filename: "site-4-6.jpeg")


listing5 = Listing.create!(
  host_id: host4.id, 
  location_id: location4.id, 
  name: 'Beachside Bungalow', 
  description: 'Whalewatchers delight! Free binoculars, travel guidebooks from the 1980s, and a grand view of the Pacific Ocean.',
  cost: 45
)

photo_5_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-1.jpeg')
listing5.photos.attach(io: photo_5_1, filename: "site-5-1.jpeg")
photo_5_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-2.jpeg')
listing5.photos.attach(io: photo_5_2, filename: "site-5-2.jpeg")
photo_5_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-3.jpeg')
listing5.photos.attach(io: photo_5_3, filename: "site-5-3.jpeg")
photo_5_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-4.jpeg')
listing5.photos.attach(io: photo_5_4, filename: "site-5-4.jpeg")
photo_5_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-5.jpeg')
listing5.photos.attach(io: photo_5_5, filename: "site-5-5.jpeg")
photo_5_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-6.jpeg')
listing5.photos.attach(io: photo_5_6, filename: "site-5-6.jpeg")

# listing5.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-5-1.jpeg"), filename: "site-5-1.jpeg")
# listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-1.jpeg'), filename: "site-5-1.jpeg")
# listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-2.jpeg'), filename: "site-5-2.jpeg")
# listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-3.jpeg'), filename: "site-5-3.jpeg")
# listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-4.jpeg'), filename: "site-5-4.jpeg")
# listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-5.jpeg'), filename: "site-5-5.jpeg")
# listing5.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-6.jpeg'), filename: "site-5-6.jpeg")


listing6 = Listing.create!(
  host_id: host4.id, 
  location_id: location4.id, 
  name: 'Leaning Leanto', 
  description: 'Charming leanto nearly untouched by mankind. Enjoy the sounds of coyotes rummaging through your dry goods for a snack.',
  cost: 25
)

photo_6_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-1.jpeg')
listing6.photos.attach(io: photo_6_1, filename: "site-6-1.jpeg")
photo_6_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-2.jpeg')
listing6.photos.attach(io: photo_6_2, filename: "site-6-2.jpeg")
photo_6_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-3.jpeg')
listing6.photos.attach(io: photo_6_3, filename: "site-6-3.jpeg")
photo_6_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-4.jpeg')
listing6.photos.attach(io: photo_6_4, filename: "site-6-4.jpeg")
photo_6_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-5.jpeg')
listing6.photos.attach(io: photo_6_5, filename: "site-6-5.jpeg")
photo_6_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-6.jpeg')
listing6.photos.attach(io: photo_6_6, filename: "site-6-6.jpeg")

# listing6.photos.attach(io: File.open("/Users/jonathan/Desktop/click-camp-photos/site-6-1.jpeg"), filename: "site-6-1.jpeg")
# listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-1.jpeg'), filename: "site-6-1.jpeg")
# listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-2.jpeg'), filename: "site-6-2.jpeg")
# listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-3.jpeg'), filename: "site-6-3.jpeg")
# listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-4.jpeg'), filename: "site-6-4.jpeg")
# listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-5.jpeg'), filename: "site-6-5.jpeg")
# listing6.photos.attach(io: open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-6.jpeg'), filename: "site-6-6.jpeg")
