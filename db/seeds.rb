# This file should contain all the record creation needed to seed the database with its default values.
require 'open-uri'

User.delete_all
Listing.delete_all
Reservation.delete_all
Review.delete_all

### Hosts ###

host1 = User.create!(
  username: 'Heidi G.',
  email: 'abc@123.com',
  password: 'password'
)

host_1_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user12.jpg')
host1.photo.attach(io: host_1_avatar, filename: "user12.jpg")


host2 = User.create!(
  username: 'Jeff B.',
  email: 'def@123.com',
  password: 'password'
)

host_2_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user10.jpg')
host2.photo.attach(io: host_2_avatar, filename: "user10.jpg")

host3 = User.create!(
  username: 'Judy M.',
  email: 'ghasdfi@123.com',
  password: 'password'
)

host_3_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user13.jpg')
host3.photo.attach(io: host_3_avatar, filename: "user13.jpg")

host4 = User.create!(
  username: 'Jerry P.',
  email: 'jkasdfal@123.com',
  password: 'password'
)

host_4_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user14.jpg')
host4.photo.attach(io: host_4_avatar, filename: "user14.jpg")

host5 = User.create!(
  username: 'Erica S.',
  email: 'jkasdfal@1asdf23.com',
  password: 'password'
)

host_5_avatar = open('https://app-name-seeds.s3.us-west-1.amazonaws.com/user18.jpg')
host5.photo.attach(io: host_5_avatar, filename: "user18.jpg")

host6 = User.create!(
  username: 'Benjamin G.',
  email: 'jklasdf@123.com',
  password: 'password'
)

host_6_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user3.jpg')
host6.photo.attach(io: host_6_avatar, filename: "user3.jpg")

host7 = User.create!(
  username: 'Emmanuel T.',
  email: 'jklasdfaewfzxf@123.com',
  password: 'password'
)

host_7_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user19.jpg')
host7.photo.attach(io: host_7_avatar, filename: "user19.jpg")

host8 = User.create!(
  username: 'Levi T.',
  email: 'jklasdasdfadsf1214f@123.com',
  password: 'password'
)

host_8_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user20.jpg')
host8.photo.attach(io: host_8_avatar, filename: "user20.jpg")

host9 = User.create!(
  username: 'Terry P.',
  email: 'jklasd123124412f@123.com',
  password: 'password'
)

host_9_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user21.jpg')
host9.photo.attach(io: host_9_avatar, filename: "user21.jpg")

host10 = User.create!(
  username: 'Lindsay H.',
  email: 'jklas2141245df@123.com',
  password: 'password'
)

host_10_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user22.jpg')
host10.photo.attach(io: host_10_avatar, filename: "user22.jpg")

host11 = User.create!(
  username: 'Charlie K.',
  email: 'jklasdsadffweaxcasd24f@123.com',
  password: 'password'
)

host_11_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user23.jpg')
host11.photo.attach(io: host_11_avatar, filename: "user23.jpg")

host12 = User.create!(
  username: 'Thatcher B.',
  email: 'jklasdf1234124125521@123.com',
  password: 'password'
)

host_12_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user24.jpg')
host12.photo.attach(io: host_12_avatar, filename: "user24.jpg")

### Guess User ###

user1 = User.create!(
  username: 'clickCamper',
  email: 'clickCamper@camp.site',
  password: 'password'
)

### Review Users ###

reviewer1 = User.create!(
  username: 'Emrys B.',
  email: 'jkasdfadslasdf@123.com',
  password: 'password'
)

reviewer_1_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user1.jpg')
reviewer1.photo.attach(io: reviewer_1_avatar, filename: "user1.jpg")

reviewer2 = User.create!(
  username: 'Kaydon L.',
  email: 'jkslasdf@1234.com',
  password: 'password'
)

reviewer_2_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user2.jpg')
reviewer2.photo.attach(io: reviewer_2_avatar, filename: "user2.jpg")

reviewer3 = User.create!(
  username: 'Mike M.',
  email: 'jkslaasdfasdsdf@1234.com',
  password: 'password'
)

reviewer_3_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user4.jpg')
reviewer3.photo.attach(io: reviewer_3_avatar, filename: "user4.jpg")

reviewer4 = User.create!(
  username: 'Ryley C.',
  email: 'jkslasdf@123adsf4.com',
  password: 'password'
)

reviewer_4_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user5.jpg')
reviewer4.photo.attach(io: reviewer_4_avatar, filename: "user5.jpg")


reviewer5 = User.create!(
  username: 'Rida W.',
  email: 'jkslasdf@123adsfad4.com',
  password: 'password'
)

reviewer_5_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user6.jpg')
reviewer5.photo.attach(io: reviewer_5_avatar, filename: "user6.jpg")

reviewer6 = User.create!(
  username: 'Bret G.',
  email: 'jkslasdf@123asdfasd4.com',
  password: 'password'
)

reviewer_6_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user9.jpg')
reviewer6.photo.attach(io: reviewer_6_avatar, filename: "user9.jpg")

reviewer7 = User.create!(
  username: 'Meredith V.',
  email: 'jkslasdf@123fadsfads4.com',
  password: 'password'
)

reviewer_7_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user7.jpg')
reviewer7.photo.attach(io: reviewer_7_avatar, filename: "user7.jpg")

reviewer8 = User.create!(
  username: 'Reggie S.',
  email: 'jkslasdf@123fdasdf4.com',
  password: 'password'
)

reviewer_8_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user11.jpg')
reviewer8.photo.attach(io: reviewer_8_avatar, filename: "user11.jpg")

reviewer9 = User.create!(
  username: 'Lexi P.',
  email: 'jkslasdf@123dfasdfds4.com',
  password: 'password'
)

reviewer_9_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user17.jpg')
reviewer9.photo.attach(io: reviewer_9_avatar, filename: "user17.jpg")

reviewer10 = User.create!(
  username: 'Aaron B.',
  email: 'jkslasddfaf@121234.com',
  password: 'password'
)

reviewer_10_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user15.jpg')
reviewer10.photo.attach(io: reviewer_10_avatar, filename: "user15.jpg")

reviewer11 = User.create!(
  username: 'Steve K.',
  email: 'jaf@121234.com',
  password: 'password'
)

reviewer_11_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user16.jpg')
reviewer11.photo.attach(io: reviewer_11_avatar, filename: "user16.jpg")

reviewer12 = User.create!(
  username: 'Jackson K.',
  email: 'jaf@12asdfasdf1234.com',
  password: 'password'
)

reviewer_12_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user25.jpg')
reviewer12.photo.attach(io: reviewer_12_avatar, filename: "user25.jpg")

reviewer13 = User.create!(
  username: 'Cortnee K.',
  email: 'ja123123f@121234.com',
  password: 'password'
)

reviewer_13_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user26.jpg')
reviewer13.photo.attach(io: reviewer_13_avatar, filename: "user26.jpg")

reviewer14 = User.create!(
  username: 'Robert D.',
  email: 'jaf1231234123s21245@121234.com',
  password: 'password'
)

reviewer_14_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user27.jpg')
reviewer14.photo.attach(io: reviewer_14_avatar, filename: "user27.jpg")

reviewer15 = User.create!(
  username: 'Nami N.',
  email: 'jaf@1212123521534.com',
  password: 'password'
)

reviewer_15_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user28.jpg')
reviewer15.photo.attach(io: reviewer_15_avatar, filename: "user28.jpg")

reviewer16 = User.create!(
  username: 'Jack W.',
  email: 'jaf@121125126126216234.com',
  password: 'password'
)

reviewer_16_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user29.jpg')
reviewer16.photo.attach(io: reviewer_16_avatar, filename: "user29.jpg")

reviewer17 = User.create!(
  username: 'Olivia K.',
  email: 'jaf@12123a1251254.com',
  password: 'password'
)

reviewer_17_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user30.jpg')
reviewer17.photo.attach(io: reviewer_17_avatar, filename: "user30.jpg")

reviewer18 = User.create!(
  username: 'Joshua S.',
  email: 'jaf@121231241262166124.com',
  password: 'password'
)

reviewer_18_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user31.jpg')
reviewer18.photo.attach(io: reviewer_18_avatar, filename: "user31.jpg")

### Listings ###

listing1 = Listing.create!(
  host_id: host1.id, 
  name: 'Aurora HOA', 
  description: 'Experience the best camping in northern CA! All campsites have fire pits and unparalled access to star-viewing.',
  cost: 45,
  lat: 37.480498,
  lng: -122.317929
)

photo_1_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-1.jpg')
listing1.photos.attach(io: photo_1_1, filename: "site-1-1.jpg")
photo_1_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-2.jpg')
listing1.photos.attach(io: photo_1_2, filename: "site-1-2.jpg")
photo_1_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-3.jpg')
listing1.photos.attach(io: photo_1_3, filename: "site-1-3.jpg")
photo_1_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-4.jpg')
listing1.photos.attach(io: photo_1_4, filename: "site-1-4.jpg")
photo_1_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-5.jpg')
listing1.photos.attach(io: photo_1_5, filename: "site-1-5.jpg")
photo_1_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-1-6.jpg')
listing1.photos.attach(io: photo_1_6, filename: "site-1-6.jpg")


listing2 = Listing.create!(
  host_id: host2.id, 
  name: 'Marshmellow Marsh', 
  description: 'Free smores are delivered upon your arrival at Marshmellow Marsh! A quick walk to the bog esplanade.',
  cost: 25,
  lat: 38.199076,
  lng: -122.018342
)

photo_2_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-1.jpg')
listing2.photos.attach(io: photo_2_1, filename: "site-2-1.jpg")
photo_2_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-2.jpg')
listing2.photos.attach(io: photo_2_2, filename: "site-2-2.jpg")
photo_2_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-3.jpg')
listing2.photos.attach(io: photo_2_3, filename: "site-2-3.jpg")
photo_2_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-4.jpg')
listing2.photos.attach(io: photo_2_4, filename: "site-2-4.jpg")
photo_2_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-5.jpg')
listing2.photos.attach(io: photo_2_5, filename: "site-2-5.jpg")
photo_2_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-2-6.jpg')
listing2.photos.attach(io: photo_2_6, filename: "site-2-6.jpg")


listing3 = Listing.create!(
  host_id: host3.id, 
  name: 'Wine Country Wagons', 
  description: 'Rose by day, and hay by night. Drink the finest north bay wines and sleep in our premium wooden wagons.',
  cost: 75,
  lat: 38.273978,
  lng: -122.242194
)

photo_3_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-1.jpg')
listing3.photos.attach(io: photo_3_1, filename: "site-3-1.jpg")
photo_3_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-2.jpg')
listing3.photos.attach(io: photo_3_2, filename: "site-3-2.jpg")
photo_3_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-3.jpg')
listing3.photos.attach(io: photo_3_3, filename: "site-3-3.jpg")
photo_3_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-4.jpg')
listing3.photos.attach(io: photo_3_4, filename: "site-3-4.jpg")
photo_3_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-5.jpg')
listing3.photos.attach(io: photo_3_5, filename: "site-3-5.jpg")
photo_3_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-3-6.jpg')
listing3.photos.attach(io: photo_3_6, filename: "site-3-6.jpg")


listing4 = Listing.create!(
  host_id: host4.id,
  name: 'Hammock Forest', 
  description: 'Relax to the max hanging out between two trees in hammock forest! Sheep are available for petting and Instagram moments.',
  cost: 65,
  lat: 37.929470, 
  lng: -122.582165
)


photo_4_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-1.jpg')
listing4.photos.attach(io: photo_4_1, filename: "site-4-1.jpg")
photo_4_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-2.jpg')
listing4.photos.attach(io: photo_4_2, filename: "site-4-2.jpg")
photo_4_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-3.jpg')
listing4.photos.attach(io: photo_4_3, filename: "site-4-3.jpg")
photo_4_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-4.jpg')
listing4.photos.attach(io: photo_4_4, filename: "site-4-4.jpg")
photo_4_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-5.jpg')
listing4.photos.attach(io: photo_4_5, filename: "site-4-5.jpg")
photo_4_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-4-6.jpg')
listing4.photos.attach(io: photo_4_6, filename: "site-4-6.jpg")


listing5 = Listing.create!(
  host_id: host5.id,
  name: 'Sierra Forest Farm', 
  description: 'Walking distance to public access at the Russian river, and a short 20 minute drive from the coast. Close to the regions best wineries and restaurants.',
  cost: 40,
  lat: 37.173290, 
  lng: -121.909813
)

photo_5_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-1.jpg')
listing5.photos.attach(io: photo_5_1, filename: "site-5-1.jpg")
photo_5_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-2.jpg')
listing5.photos.attach(io: photo_5_2, filename: "site-5-2.jpg")
photo_5_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-3.jpg')
listing5.photos.attach(io: photo_5_3, filename: "site-5-3.jpg")
photo_5_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-4.jpg')
listing5.photos.attach(io: photo_5_4, filename: "site-5-4.jpg")
photo_5_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-5.jpg')
listing5.photos.attach(io: photo_5_5, filename: "site-5-5.jpg")
photo_5_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-5-6.jpg')
listing5.photos.attach(io: photo_5_6, filename: "site-5-6.jpg")


listing6 = Listing.create!(
  host_id: host6.id,
  name: 'Beachside Bungalow', 
  description: 'Whalewatchers delight! Free binoculars, travel guidebooks from the 1980s, and a grand view of the Pacific Ocean.',
  cost: 45,
  lat: 38.002312, 
  lng: -123.009124
)

photo_6_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-1.jpg')
listing6.photos.attach(io: photo_6_1, filename: "site-6-1.jpg")
photo_6_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-2.jpg')
listing6.photos.attach(io: photo_6_2, filename: "site-6-2.jpg")
photo_6_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-3.jpg')
listing6.photos.attach(io: photo_6_3, filename: "site-6-3.jpg")
photo_6_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-4.jpg')
listing6.photos.attach(io: photo_6_4, filename: "site-6-4.jpg")
photo_6_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-5.jpg')
listing6.photos.attach(io: photo_6_5, filename: "site-6-5.jpg")
photo_6_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-6-6.jpg')
listing6.photos.attach(io: photo_6_6, filename: "site-6-6.jpg")

listing7 = Listing.create!(
  host_id: host7.id, 
  name: 'Berkeley Bivouac', 
  description: 'Who knew camping was so close to the city? Escape the real world Berkeley style, reading a book, climbing the local hills, or simply sitting around the fire and talking about politics.',
  cost: 65,
  lat: 37.886947, 
  lng: -122.239774
)

photo_7_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-7-1.jpg')
listing7.photos.attach(io: photo_7_1, filename: "site-7-1.jpg")
photo_7_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-7-2.jpg')
listing7.photos.attach(io: photo_7_2, filename: "site-7-2.jpg")
photo_7_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-7-3.jpg')
listing7.photos.attach(io: photo_7_3, filename: "site-7-3.jpg")
photo_7_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-7-4.jpg')
listing7.photos.attach(io: photo_7_4, filename: "site-7-4.jpg")
photo_7_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-7-5.jpg')
listing7.photos.attach(io: photo_7_5, filename: "site-7-5.jpg")
photo_7_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-7-6.jpg')
listing7.photos.attach(io: photo_7_6, filename: "site-7-6.jpg")

listing8 = Listing.create!(
  host_id: host8.id, 
  name: 'Guerneville Gulch', 
  description: 'Walking distance to public access at the Russian river, and a short 20 minute drive from the coast. Close to the regions best wineries and restaurants.',
  cost: 70,
  lat: 38.478108,
  lng: -122.993168
)

photo_8_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-8-1.jpg')
listing8.photos.attach(io: photo_8_1, filename: "site-8-1.jpg")
photo_8_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-8-2.jpg')
listing8.photos.attach(io: photo_8_2, filename: "site-8-2.jpg")
photo_8_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-8-3.jpg')
listing8.photos.attach(io: photo_8_3, filename: "site-8-3.jpg")
photo_8_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-8-4.jpg')
listing8.photos.attach(io: photo_8_4, filename: "site-8-4.jpg")
photo_8_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-8-5.jpg')
listing8.photos.attach(io: photo_8_5, filename: "site-8-5.jpg")
photo_8_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-8-6.jpg')
listing8.photos.attach(io: photo_8_6, filename: "site-8-6.jpg")

listing9 = Listing.create!(
  host_id: host9.id, 
  name: 'Leaning Leanto', 
  description: 'Charming leanto nearly untouched by mankind. Enjoy the sounds of coyotes rummaging through your dry goods for a snack.',
  cost: 25,
  lat: 38.188452,
  lng: -122.364720
)

photo_9_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-9-1.jpg')
listing9.photos.attach(io: photo_9_1, filename: "site-9-1.jpg")
photo_9_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-9-2.jpg')
listing9.photos.attach(io: photo_9_2, filename: "site-9-2.jpg")
photo_9_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-9-3.jpg')
listing9.photos.attach(io: photo_9_3, filename: "site-9-3.jpg")
photo_9_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-9-4.jpg')
listing9.photos.attach(io: photo_9_4, filename: "site-9-4.jpg")
photo_9_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-9-5.jpg')
listing9.photos.attach(io: photo_9_5, filename: "site-9-5.jpg")
photo_9_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-9-6.jpg')
listing9.photos.attach(io: photo_9_6, filename: "site-9-6.jpg")

listing10 = Listing.create!(
  host_id: host10.id, 
  name: 'Big Sur Beachfront', 
  description: 'Nestled among the coastal trees you will find a cozy break from the elements, but sweeping views of the Big Sur coastline. Great hikes all along the beach trails and up into the woods to the East.',
  cost: 50,
  lat: 37.261732, 
  lng: -122.410615
)

photo_10_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-10-1.jpg')
listing10.photos.attach(io: photo_10_1, filename: "site-10-1.jpg")
photo_10_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-10-2.jpg')
listing10.photos.attach(io: photo_10_2, filename: "site-10-2.jpg")
photo_10_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-10-3.jpg')
listing10.photos.attach(io: photo_10_3, filename: "site-10-3.jpg")
photo_10_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-10-4.jpg')
listing10.photos.attach(io: photo_10_4, filename: "site-10-4.jpg")
photo_10_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-10-5.jpg')
listing10.photos.attach(io: photo_10_5, filename: "site-10-5.jpg")
photo_10_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-10-6.jpg')
listing10.photos.attach(io: photo_10_6, filename: "site-10-6.jpg")

listing11 = Listing.create!(
  host_id: host11.id, 
  name: 'Monte Bellow Preserve', 
  description: 'A short drive off skyline drive we have a wonderful spot that we are now sharing with campers. A very rewarding hike nearby is Black Mountain, where you can see back into and over the Bay. Only 1 hour drive from downtown San Francisco',
  cost: 70,
  lat: 37.318247,
  lng: -122.154742
)

photo_11_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-11-1.jpg')
listing11.photos.attach(io: photo_11_1, filename: "site-11-1.jpg")
photo_11_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-11-2.jpg')
listing11.photos.attach(io: photo_11_2, filename: "site-11-2.jpg")
photo_11_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-11-3.jpg')
listing11.photos.attach(io: photo_11_3, filename: "site-11-3.jpg")
photo_11_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-11-4.jpg')
listing11.photos.attach(io: photo_11_4, filename: "site-11-4.jpg")
photo_11_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-11-5.jpg')
listing11.photos.attach(io: photo_11_5, filename: "site-11-5.jpg")
photo_11_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-11-6.jpg')
listing11.photos.attach(io: photo_11_6, filename: "site-11-6.jpg")

listing12 = Listing.create!(
  host_id: host12.id, 
  name: 'Vacaville Village Retreat', 
  description: 'People from all over the world flock to Vacaville for the annual frozen man ice festival every January. There is no better place to stay than here at Vacaville Village Retreat, where you have quick access to all of the festivities, but are also secluded enough to just sit back and let the day pass by. 😎',
  cost: 70,
  lat: 38.356072,
  lng: -122.008822
)

photo_12_1 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-12-1.jpg')
listing12.photos.attach(io: photo_12_1, filename: "site-12-1.jpg")
photo_12_2 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-12-2.jpg')
listing12.photos.attach(io: photo_12_2, filename: "site-12-2.jpg")
photo_12_3 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-12-3.jpg')
listing12.photos.attach(io: photo_12_3, filename: "site-12-3.jpg")
photo_12_4 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-12-4.jpg')
listing12.photos.attach(io: photo_12_4, filename: "site-12-4.jpg")
photo_12_5 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-12-5.jpg')
listing12.photos.attach(io: photo_12_5, filename: "site-12-5.jpg")
photo_12_6 = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/site-12-6.jpg')
listing12.photos.attach(io: photo_12_6, filename: "site-12-6.jpg")

### Reservations ###

res_1_check_in = (Time.now + 1000000)
res_1_check_out = (Time.now + 1250000)

reservation1 = Reservation.create!(
  camper_id: user1.id,
  listing_id: listing3.id,
  check_in: res_1_check_in,
  check_out: res_1_check_out,
)

res_2_check_in = (Time.now - 1500000)
res_2_check_out = (Time.now - 1000000)

reservation2 = Reservation.create!(
  camper_id: user1.id,
  listing_id: listing2.id,
  check_in: res_2_check_in,
  check_out: res_2_check_out,
)

### Reviews ###

### Listing 1 Reviews ###

review1 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer1.id,
  text: "Incredible location and views of the ocean. Close to beautiful hiking.",
  recommends: true
)

review2 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer2.id,
  text: "Utterly fantastic experience from start to finish. The directions provided were accurate and useful, the location was easy to find, and the host super friendly and welcoming.",
  recommends: true
)

review3 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer3.id,
  text: "The site itself was jaw-dropping gorgeous and felt very private (though we were the only campers there at the time - ymmv on privacy, but its set up to have multiple relatively private sites).",
  recommends: true
)

review4 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer4.id,
  text: "There were so many animals! We saw jellyfish, seals, pelicans, so many birds, even a couple whale spouts in the distance. We also had the company of one of the property's cats, who was the sweetest feline I think I've ever met.",
  recommends: true
)

review5 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer5.id,
  text: "My only regret is we didn't book a longer trip. If you're thinking of booking, do it, the pictures don't do the place justice.",
  recommends: true
)

review6 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer6.id,
  text: "If you can believe it, this spot is even more beautiful than the photos.",
  recommends: true
)

review7 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer7.id,
  text: "There's a wicked fire pit, grill, and bench, plus tons of primo cliff perches--and you get 'em all to yourself. (Well, you might have to share with the Wellhouse folks, but they'll probably be cool too.) Just make sure you pick up firewood on your way in.",
  recommends: true
)

review8 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer8.id,
  text: "If you don't feel like cooking, the Ocean Cove Bar and Grill is only a two-minute walk down the road. You're also a short drive from Salt Point Park hiking (to your north) and Salmon Creek surfing (to your south.)",
  recommends: true
)

review9 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer9.id,
  text: "Stop at the Aquatica Cafe in Jenner on your way in--the lox on focaccia was 👌",
  recommends: true
)

review10 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer10.id,
  text: "We absolutely loved this spot. Would (and plan to) come back!",
  recommends: true
)

review11 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer11.id,
  text: "It's hard to convey how spectacular it is- although the photos do a good job- it really is that beautiful.",
  recommends: true
)

review67 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer12.id,
  text: "#{listing1.name} is an incredible oasis of seemingly untouched beauty and vast natural allure. It was everything we desired in a camp site.",
  recommends: true
)

review68 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer13.id,
  text: "We brought our two dogs and I think they may have managed to have more fun than we did. We took them on walks to the surrounding peaks that were lined with trails and we explored the entire property as much as we could.",
  recommends: true
)

review69 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer14.id,
  text: "There was a ton of space at our site and plenty of privacy. #{host1.username.split(" ")[0]} was as helpful of a host as you could hope for.",
  recommends: true
)

review70 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer15.id,
  text: "We visited #{listing1.name} in mid-April and the wildflowers were in fantastic bloom. They were honestly mesmerizing. The only thing that out did the wildflowers were the stars at night.",
  recommends: true
)

review71 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer16.id,
  text: "Whether you are traveling as a family, as a couple, or you are on a solo trip, #{listing1.name} will provide lasting memories of beautiful natural landscapes, incredible star-filled night skies, and a refreshing connection to the outdoors.",
  recommends: true
)

review72 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer17.id,
  text: "This place is a gem and we are already planning a return trip.",
  recommends: true
)

review73 = Review.create!(
  listing_id: listing1.id,
  reviewer_id: reviewer18.id,
  text: "There's a toilet just a short walk from the site, two fire rings, a place to stash your trash, and two picnic tables under the patio structure. It feels like you're all alone out in the wilderness.",
  recommends: true
)

### Listing 2 Reviews ###

review12 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer11.id,
  text: "Unlike conventional campsites, there is no picnic bench for meals, so bring some camping chairs of your own. Also be sure to bring firewood.",
  recommends: true
)

review13 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer10.id,
  text: "We got to spend lots of quality time with Jeff's two adorable cats - for us, this was an incredible addition; they're adorable and adoring :) However, if you're allergic to cats, it might be tough as they like to drop in quite a bit.",
  recommends: true
)

review14 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer9.id,
  text: "Great campsite!! Right on the cliffs overlooking the ocean, it is nestled in a cove so there's really not much wind as well.",
  recommends: true
)

review15 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer8.id,
  text: "The best part was the owner's cat Simone! She hung out with us the whole time we were there and even slept in the tent of one of my friends.",
  recommends: true
)

review16 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer7.id,
  text: "If you don't like cats - this is not the campsite for you. The cat is very insistently cuddly :)",
  recommends: true
)

review17 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer6.id,
  text: "I wasn't ready for the cats. I have an allergy and ended up spending most of my time shooing them away with a quidditch stick",
  recommends: false
)

review18 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer5.id,
  text: "The view! The VIEW! It was a gorgeous evening and morning with warm temps and a gorgeous sunset.",
  recommends: true
)

review19 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer4.id,
  text: "I haven't slept that soundly in what feels like forever with the pounding surf lulling me into a deep meditative peace. I can't wait to go back!",
  recommends: true
)

review20 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer3.id,
  text: "Absolutely breathtaking spot!",
  recommends: true
)

review21 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer2.id,
  text: "The view at #{listing2.name} is unparalleled. Camping at the top of a 100-foot bluff overlooking the Pacific was a different kind of surreal.",
  recommends: true
)

review22 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer1.id,
  text: "Truly the best campsite views I've ever experienced.",
  recommends: true
)

review74 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer18.id,
  text: "#{listing2.name} was fantastic, we couldn't have had a better time. #{host2.username.split(" ")[0]} was a pleasure to deal with and hooked us up with plenty of firewood not to mention a 6 foot galvanized tub filled with water and waiting for us. A game changer :)",
  recommends: true
)

review75 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer16.id,
  text: "The tap water has a funny taste, I suggest bringing your own drinking water.",
  recommends: false
)

review76 = Review.create!(
  listing_id: listing2.id,
  reviewer_id: reviewer14.id,
  text: "The site was everything that I wanted and more. This was a great way to get outside and do some easy car camping but not be right next to anyone else.",
  recommends: true
)

### Listing 3 Reviews ###

review23 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer5.id,
  text: "This place is magic. Great, communicative host and the place is truly amazing.",
  recommends: true
)

review24 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer7.id,
  text: "Sleeping to the sounds of the ocean pounding up against the cliffs puts you to sleep like a baby!",
  recommends: true
)

review77 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer17.id,
  text: "The stars were amazing and I will definitely be coming back.",
  recommends: true
)

review25 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer9.id,
  text: "Excellent experience at this charming spot. Didn't want to leave. A short walk downhill to your own little heaven...",
  recommends: true
)

review78 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer18.id,
  text: "Great spot, very nice host. Stayed after some recent rains so there was some nice short grass on the ground. Make sure to bring an axe and/or enough intermediate kindling because the almond wood the host sells is a little difficult to get going.",
  recommends: true
)

review26 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer11.id,
  text: "Incredible location overlooking the water. There is some highway noise but other than that it felt private and secluded.",
  recommends: true
)

review79 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer12.id,
  text: "A quick drive from The Bay, but a world apart. This site sits atop a quiet, expansive mesa with nice views and a lovely sunset. Enough space to park cars away from the tents and firepit ensures a chilled experience.",
  recommends: true
)

review27 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer1.id,
  text: "Bathroom and access to drinking water are located in the house / at the top of the hill, so there will be some trips back and forth.",
  recommends: false
)

review80 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer14.id,
  text: "It was our first time at #{listing3.name} and we had lots of fun! #{host3.username.split(" ")[0]} was very nice and accommodating. Jill the dog was so sweet and played catch with us.",
  recommends: true
)

review28 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer3.id,
  text: "Overall, a great experience and highly recommend!",
  recommends: true
)

review81 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer16.id,
  text: "This place is great! Very private with plenty of space between the sites. We had to cut our stay short for personal reasons but will be back.",
  recommends: true
)

review29 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer6.id,
  text: "Beautiful place that was so accessible from the main roads that I was doubtful I was actually going to be camping and not pitching a tent next to someone's mailbox.",
  recommends: true
)

review30 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer8.id,
  text: "I found myself surrounded by trees, looking at the great Pacific Ocean and totally secluded.",
  recommends: true
)

review31 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer10.id,
  text: "At night our campfire was the only light around (other than the stars) Nothing less than greatness.",
  recommends: true
)

review32 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer2.id,
  text: "I will try to go back if I can find some open dates.",
  recommends: true
)

review33 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer4.id,
  text: "The campsite was located in absolutely incredible place and views are everything - the fire pit is a beautiful stone ring with the most breathtaking views.",
  recommends: true
)

### Listing 4 Reviews ###

review82 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer11.id,
  text: "The campgrounds at #{listing4.name} were great! Quiet, clean, beautiful area. ",
  recommends: true
)

review83 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer12.id,
  text: "Amazingly beautiful, easy to find. The lodge looked amazing for a group so we will be back for that!",
  recommends: true
)

review84 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer15.id,
  text: "We loved camping here! The property is beautiful and remote and the campsite had everything we needed. #{host4.username.split(" ")[0]} was very friendly and has created a great spot for people to enjoy solitude and stargazing. Would definitely come back here!",
  recommends: true
)

review85 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer14.id,
  text: "We had an awesome stay at #{listing4.name}. The place was well marked and the road to it was not difficult even for a car with low clearance. The hosts were very nice.",
  recommends: true
)

review86 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer13.id,
  text: "We hiked around a bit but mostly enjoyed the firepits and view of the valley. Great trip!",
  recommends: true
)

review87 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer18.id,
  text: "This place is a gem, perfectly situated, quiet, gorgeous, clean. Its as if each camping spot was set up to protect the experience of each camping group, for the best views.",
  recommends: true
)

review88 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer17.id,
  text: "Its wonderful for a large group, but also smaller groups and even solo travelers like myself looking to get back to the basics.",
  recommends: true
)

review34 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer2.id,
  text: "Very well thought out and cared for space, the pictures don't do it justice!",
  recommends: true
)

review35 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer6.id,
  text: "The host, location, price, ease of access to town all make this a prime locates for a quick getaway.",
  recommends: true
)

review36 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer10.id,
  text: "I love everything about this amazing Hipcamp! This was my first time camping by myself and I can't imagine a better experience.",
  recommends: true
)

review37 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer3.id,
  text: "When we needed something the host was nearby, otherwise we were left to do our own thing. Super laid back spot close to to awesome hikes!",
  recommends: true
)

review38 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer7.id,
  text: "We had a great stay at #{listing4.name} over the Memorial Day weekend! The host was very responsive and the campground had everything we needed.",
  recommends: true
)

review39 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer11.id,
  text: "The location was amazing and tips from the host about things to do in the area led to an amazing and memorable trip!",
  recommends: true
)

review40 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer4.id,
  text: "#{listing4.name} is a lovely property with a great location, 3 miles from very pretty, uncrowded hikes in Kodachrome Basin State Park.",
  recommends: true
)

review41 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer8.id,
  text: "We had a great stay! The property is beautiful with a well thought out design. I would highly recommend this location!",
  recommends: true
)

review42 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer1.id,
  text: "#{listing4.name} is a well maintained campsite with the most amazing host! ",
  recommends: true
)

review43 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer5.id,
  text: "The sunrise from his property is incredible. Don't think about it, book a campsite here right away.",
  recommends: true
)

review44 = Review.create!(
  listing_id: listing4.id,
  reviewer_id: reviewer9.id,
  text: "#{listing4.name} was my favorite camping spot over a week of camping in Northern CA",
  recommends: true
)

### Listing 5 Reviews ###

review45 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer11.id,
  text: "It is obvious that the owner takes great pride in their land and cares about the experience for campers.",
  recommends: true
)

review46 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer10.id,
  text: "Each spot is thoughtfully carved out with a nice pad for a tent, fire ring set up and ready to go with wood and kindling (and extra wood for $5)",
  recommends: true
)

review47 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer9.id,
  text: "There is a compost toilet a short walk away from the campsites with a magnificent view of the valley!",
  recommends: true
)

review48 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer8.id,
  text: "This is a sink for doing dishes, a trash can, water spigot, and a primitive shower.",
  recommends: true
)

review49 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer7.id,
  text: "It was such a pleasant experience staying here and I would whole heartedly recommend this gem to anyone traveling through!",
  recommends: true
)

review50 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer6.id,
  text: "The location is beautiful, especially when sunset lights up the mountains around camp. The nearest market is about 10-15 minutes drive.",
  recommends: true
)

review51 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer5.id,
  text: "There is plenty of potable water and a dish washing station--super helpful!",
  recommends: true
)

review52 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer4.id,
  text: "There are three sweet dogs that love playing fetch or getting cuddles. If you don't want to hang with dogs, he keeps them up at his home, away from camp",
  recommends: true
)

review53 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer3.id,
  text: "We spent 4 days there and loved it! The place and the surroundings are gorgeous. We can't wait to get back! It's primitive but has all you need.",
  recommends: true
)

review54 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer2.id,
  text: "The sites are not huge but had plenty of room for our 3 man tent, and were furnished with nice wooden and stone tables and benches - a great touch.",
  recommends: true
)

review55 = Review.create!(
  listing_id: listing5.id,
  reviewer_id: reviewer1.id,
  text: "The views from the property are great as well, a perfect base from which to explore the surrounding area or just to stay for one night, as we did.",
  recommends: true
)

### Listing 6 Reviews ###

review56 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer8.id,
  text: "I wish I could give the hosts an even higher rating! Really pretty property with flat soft ground.",
  recommends: true
)

review57 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer9.id,
  text: "There's a covered shelter area with a grill, which would be perfect for events.",
  recommends: true
)

review90 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer18.id,
  text: "I have stayed at #{listing6.name} a couple of times now, & it is always so great. Adequate privacy, well-kept sites, picnic tables, & fire rings make camping comfortable. We love staying here!",
  recommends: true
)

review91 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer16.id,
  text: "We are big fans of #{listing6.name} and come back as often as we can! The double fire pit was awesome for the 9 of us camping - nice spacious area and convenient toilets nearby!",
  recommends: true
)

review92 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer14.id,
  text: "Love this place! Views are amazing and hosts are very accommodating. Would definitely recommend this place! Coming back in a couple of weeks!",
  recommends: true
)

review93 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer12.id,
  text: "Love this place! Most beautiful during spring when grass and greenery is plentiful. The views are spectacular, especially when there are a lot of clouds. #{host6.username.split(" ")[0]} has been an excellent host as always and provides firewood if you need to buy some.",
  recommends: true
)

review94 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer13.id,
  text: "#{host6.username.split(" ")[0]} was incredibly helpful going above and beyond to make our stay the best it could be.",
  recommends: true
)

review58 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer10.id,
  text: "Light pollution is minimal, so you can see a lot of stars most nights - and you're not far from several major national parks.",
  recommends: true
)

review59 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer11.id,
  text: "We arrived late to the camp. On the way we stopped for firewood. To my surprise there was firewood already prepared in a firepit can ready to go!",
  recommends: true
)

review60 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer7.id,
  text: "This is a perfect location for travellers who want to visit national parks.",
  recommends: true
)

review61 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer6.id,
  text: "This is a great campground. The hosts were very welcoming, and the campsites were spread out and scenic. The amenities such as the restrooms/showers were clean and above and beyond what I’d expect at a typical campground.",
  recommends: true
)

review62 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer5.id,
  text: "The campsite was beautiful and would very much recommend. They also had firewood for sale.",
  recommends: true
)

review63 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer4.id,
  text: "The campsite was beautiful and the amenities were amazing. It was good to have a full bathroom and access to drinking water on site.",
  recommends: true
)

review64 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer3.id,
  text: "There’s fishing in the property catch and release (bass). The owner also has a trout pond 35 dollar you can keep those. Showers and bathrooms are very clean. Perfect place if you want to avoid crowds.",
  recommends: true
)

review65 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer2.id,
  text: "It was everything we hoped it would be! The host was great and made us feel welcome on their property. We're definitely going back.",
  recommends: true
)

review66 = Review.create!(
  listing_id: listing6.id,
  reviewer_id: reviewer1.id,
  text: "This property is beautiful and lovingly maintained by owners who have a strong connection to the land. The site is clean and comfortable with a very nice bathroom complete with hot shower.",
  recommends: true
)

### Listing 7 Reviews ###

review95 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer18.id,
  text: "Wow, what a campsite! #{host7.username.split(" ")[0]} was a fantastic host! The site was perfect and exactly as described. We felt like we were the only people on the planet. The stars were so clear and bright at night, it was so incredible.",
  recommends: true
)

review96 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer16.id,
  text: "This place was secluded and a beautiful drive up the 33 from the coast. #{host7.username.split(" ")[0]} swung by and said hello, he seemed super nice. We had lots of privacy but were close enough to other folks if we wanted to say hello.",
  recommends: true
)

review97 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer14.id,
  text: "I saw a shooting star and had the fire lit all night, nice & relaxing getaway for the weekend. I will probably come back!",
  recommends: true
)

review98 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer12.id,
  text: "The two fire rings were super useful (we used the smaller one with attached grill for foil packet cooking, and we used the larger ring for raging bonfires and s'mores).",
  recommends: true
)

review99 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer10.id,
  text: "With the three picnic tables under the double roof, there was tons of space for gas stove cooking, snacking, and eating.",
  recommends: true
)

review100 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer8.id,
  text: "We set up four tents in a spacious semi-circle around an enormous juniper bush, and the short walk to the clean outhouse and the faucet were easy and pleasant. ",
  recommends: true
)

review101 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer6.id,
  text: "When we drove down to the ranch to buy firewood, we met #{host7.username.split(" ")[0]}, who was super friendly, and two amazing dogs.",
  recommends: true
)

review102 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer4.id,
  text: "It rained and was surprisingly freezing at times (and hot at others) so pack those shorts, longjohns, rain jackets, and gloves!",
  recommends: false
)

review102 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer2.id,
  text: "Great site, beautiful views, very clean and well kept! It was relatively private. Thanks #{host7.username.split(" ")[0]}",
  recommends: true
)

review103 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer17.id,
  text: "Such a beautiful spot! I will definitely be coming back in the near future. Thanks!",
  recommends: true
)

review104 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer15.id,
  text: "We loved #{listing7.name}! #{host7.username.split(" ")[0]} has created a fully functional and efficient group of campsites. The sites are fitted with sturdy lunch tables, a bonfire, a grill, and chairs.",
  recommends: true
)

review105 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer13.id,
  text: "Great site, private, stunning scenery, gracious host.",
  recommends: true
)

review106 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer11.id,
  text: "We really enjoyed meeting #{host7.username.split(" ")[0]} and will be back for sure",
  recommends: true
)

review107 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer9.id,
  text: "This camp site had chairs available, a water hose, bench with shade, and a fire pit as well. It's quite spacious and it was a good distance away from everything!",
  recommends: true
)

review108 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer7.id,
  text: "One of the best thing about this camp site was star gazing at night! It was so beautiful and such a great experience.",
  recommends: true
)

review109 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer5.id,
  text: "I would definitely recommend this camp site :)",
  recommends: true
)

review110 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer3.id,
  text: "#{host7.username.split(" ")[0]} was a great host - easily accessible but not ever present. The site was exactly as described with great views of the valley below. Would stay again!",
  recommends: true
)

review111 = Review.create!(
  listing_id: listing7.id,
  reviewer_id: reviewer1.id,
  text: "This campsite hosts exceptional beauty. The sunset and moonrise were absolutely stunning, and the air so crisp and delicious.",
  recommends: true
)

### Listing 8 Reviews ###

review111 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer1.id,
  text: "#{listing8.name} is an absolute DREAM!! I camped solo with my pup, and had the most amazing time. The garden was beautiful, the hikes were incredible, and the cove is absolutely perfect.",
  recommends: true
)

review112 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer3.id,
  text: "Town isn't too far so if you need to restock marshmallows (like I did), its quick and easy! Thanks for a wonderful stay. I will be back!",
  recommends: true
)

review113 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer5.id,
  text: "Probably one of my favourite farms to camp at so far, #{listing8.name} had everything I needed. A nice campsite, trails to explore and the ocean only a short hike away.",
  recommends: true
)

review114 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer7.id,
  text: "Not only is the farm beautiful itself but where it's located is plenty enough inviting if you're looking for a getaway.",
  recommends: true
)

review115 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer9.id,
  text: "Don't start blabbing to your friends what a great place #{listing8.name} is. You'll ruin it for the rest of us.",
  recommends: true
)

review116 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer11.id,
  text: "The campgrounds were lovely, and right across the street from a gorgeous beach. The Ecological Staircase trail provides a great hike from the campground, and there are many other hikes nearby.",
  recommends: true
)

review117 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer13.id,
  text: "We loved the communal cooking area - so useful to have a sink!",
  recommends: true
)

review118 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer15.id,
  text: "The coastline in this area is stunning! Don't expect luxury camping - there are basic long-drop type toilets and no showers, but if you enjoy plenty of space and seclusion and being close to nature then this is your spot.",
  recommends: true
)

review119 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer17.id,
  text: "This is a wonderful place to camp! It is so close to the beach and other trails to hike on. ",
  recommends: true
)

review120 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer2.id,
  text: "We had a large group of people in several sites (3 and 4) and it worked out great. Great fire pits and sink for cooking.",
  recommends: true
)

review121 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer4.id,
  text: "Laid back atmosphere. Overall quiet. Very friendly owner and staff. Minutes from beach. Lot 5 is the way to go. Would def go back.",
  recommends: true
)

review122 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer6.id,
  text: "The trail to the beach is pretty nice undercutting a bridge with great scenic views.",
  recommends: true
)

review123 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer8.id,
  text: "Incredible spot with a short and beautiful hike to a gorgeous beach <3",
  recommends: true
)

review124 = Review.create!(
  listing_id: listing8.id,
  reviewer_id: reviewer10.id,
  text: "We spent two very nice, serene nights at #{listing8.name}. The campgrounds are spacious and quiet with plenty of space between sites--although I can imagine when it's at capacity it might get a bit louder.",
  recommends: true
)

### Listing 9 Reviews ###

review125 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer8.id,
  text: "The campsite was great. Walking distance to the beach and to the Ecological Staircase trail up to the pygmy forest.",
  recommends: true
)

review126 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer9.id,
  text: "Nice Eco-Friendly campground. Just make sure to pack your trash accordingly, there's no dumpster or trash bins nearby, so you're going to have to take it with you (watch out for leaks in your bag).",
  recommends: true
)

review127 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer10.id,
  text: "There is a presence of wildlife in the area, so just be mindful and scan the environment, don't want to end up being mountain lion dinner. 🦁",
  recommends: true
)

review128 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer11.id,
  text: "Very nice campsite lots of trails and right by the beach. Loved it, will definitely go back...",
  recommends: true
)

review129 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer12.id,
  text: "Great site--all of the amenities you want without spoiling the feeling of seclusion and ruggedness.",
  recommends: true
)

review130 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer13.id,
  text: "We had a total blast at #{listing9.name}! Despite the weather the campground and services were top notch. #{host9.username.split(" ")[0]} the host was lovely and went above and beyond by helping us out with our dead car battery (thanks Warren!)",
  recommends: true
)

review131 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer14.id,
  text: "The trails were immaculate and the beach was absolutely breathtaking. Can't wait to come back in the Summer!",
  recommends: true
)

review132 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer15.id,
  text: "We came on the right weekend, and were invited to participate in their monthly Aztec ceremony in their temazcal (sweat lodge). It was an intense spiritual and physical experience.",
  recommends: true
)

review133 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer16.id,
  text: "Glorious!",
  recommends: true
)

review134 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer17.id,
  text: "Epic Spot! You are right on the coast so bring cozy water resistant gear and you will have a great time.",
  recommends: true
)

review135 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer18.id,
  text: "Had a great time camping here over a rainy Thanksgiving weekend, very friendly hosts and beautiful hiking trails just a short walk away.",
  recommends: true
)

review136 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer1.id,
  text: "Nicer facilities (outhouse and dishwashing area) compared to most campgrounds where I've stayed.",
  recommends: true
)

review137 = Review.create!(
  listing_id: listing9.id,
  reviewer_id: reviewer2.id,
  text: "A 5-minute walk one way to beaches and cliffs, and 5 minutes the other way to dense forests, it was everything we hoped for. I would love to come back in the summer. 10/10",
  recommends: true
)

### Listing 10 Reviews ###

review137 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer12.id,
  text: "Rolling hills, vineyards all around, and a farm full of animals. What's not to love about #{listing10.name}?",
  recommends: true
)

review138 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer11.id,
  text: "Host #{host10.username.split(" ")[0]} is a great host, showing us around the property and introducing us to the chickens, llama, goats, burro, emus, doves, cats, and dogs.",
  recommends: true
)

review139 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer10.id,
  text: "The tent site, which is large and flat, is in a nicely shaded grove surrounded by tall trees.",
  recommends: true
)

review140 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer9.id,
  text: "The property is so quiet at night that you'll think you're farther away from civilization.",
  recommends: true
)

review141 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer8.id,
  text: "#{listing10.name} was an incredible experience. The hospitality was beyond welcoming - #{host10.username.split(" ")[0]} makes you feel like their farm is your home.",
  recommends: true
)

review142 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer7.id,
  text: "We were really interested in the animals so they let us hunt for eggs in the chicken coop, hold the baby goat, milk the mother goat, and feed the donkey.",
  recommends: true
)

review143 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer6.id,
  text: "The location is perfect, its a few minutes walking from a few wineries, and just a 4 minute drive to the nearest grocery store.",
  recommends: true
)

review144 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer5.id,
  text: "We will be back, and recommend to everyone!",
  recommends: true
)

review145 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer4.id,
  text: "The Farm animals all appeared happy and well cared for and there are lots of chickens and fresh eggs available.",
  recommends: true
)

review146 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer3.id,
  text: "We hope to return to #{listing10.name} and recommend it highly if you are looking for a relaxing get-away in a beautiful setting.",
  recommends: true
)

review147 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer2.id,
  text: "We enjoyed being on the farm and seeing all of the animals, and it’s walking distance to several wineries (10-20 minute walk).",
  recommends: true
)

review148 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer1.id,
  text: "#{host10.username.split(" ")[0]} was a great host - very accommodating and easy to communicate with. The spot was just what we needed before heading up to Henry Coe for a day of hiking.",
  recommends: true
)

review149 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer18.id,
  text: "Hosts were gracious. The kids loved hanging out with the animals. Though, pictures online look to have been taken when things were much more green. And the potty tent was not a great experience.",
  recommends: false
)

review150 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer17.id,
  text: "Very pleasant evening in a real small farm settings.",
  recommends: true
)

review151 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer16.id,
  text: "The kids loved looking for eggs and visits with the cats, dogs, goats, donkey, alpaca, emu and rhea.",
  recommends: true
)

review152 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer15.id,
  text: "Very nice and friendly family. They show you around their farm :)",
  recommends: true
)

review153 = Review.create!(
  listing_id: listing10.id,
  reviewer_id: reviewer14.id,
  text: "They let us buy some firewood for $5 and there was a fire pit at the site. They just added a popup toilet and tent, which was a great addition.",
  recommends: true
)

### Listing 11 Reviews ###

review154 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer7.id,
  text: "While #{listing11.name} is a bring-your-own-tent type of site, there is a raised platform that could be used to place gear and probably even sleep on if you needed to.",
  recommends: true
)

review155 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer4.id,
  text: "#{listing11.name} campsite provides beauty and views galore, but you should be prepared to bring all of your other equipment.",
  recommends: true
)

review156 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer1.id,
  text: "There is water available on site, but you should plan on bringing something to store the water and possibly even a portable shade for the hot summer months.",
  recommends: true
)

review157 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer2.id,
  text: "This is a walk-in site, so be prepared to pack all of your stuff with you as you make your way out to Coyote View, but don't worry, it's less than 1/4 mile walk.",
  recommends: true
)

review158 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer5.id,
  text: "The #{listing11.name} site is a great place to enjoy some solitude and to relax for a bit, but you are not expected to remain confined to your site while on your stay.",
  recommends: true
)

review159 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer8.id,
  text: "There is a firepit that can be used when the conditions are right. #{host11.username.split(" ")[0]} was kind enough to provide outdoor kitchen essentials at the main house",
  recommends: true
)

review160 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer3.id,
  text: "Not only is this a good location to use a jump-off for the high country, it is a great weekend getaway spot that also offers land stewardship opportunities.",
  recommends: true
)

review161 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer9.id,
  text: "Any way you look at it, this place should be on your list.",
  recommends: true
)

review162 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer11.id,
  text: "The site has two suspending beds, camp chairs, a small table, and large water container (what more can you ask for).",
  recommends: true
)

review163 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer13.id,
  text: "I suggest bringing your own bedding for either of those options (sheets for the full bed and sleeping bags/blankets for the suspended beds).",
  recommends: true
)

review164 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer15.id,
  text: "This was a lovely site on some very lovely land. After days of car camping in crowded NPS campgrounds during the holidays, it was great to switch into backpacker-lite mode and sleep in a quiet field under the stars.",
  recommends: true
)

review165 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer10.id,
  text: "This place.... is soooo great!! #{host11.username.split(" ")[0]} is a great host and the atmosphere around the camp is amazing. I really would come here again. The view is beautiful!",
  recommends: true
)

review166 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer12.id,
  text: "#{host11.username.split(" ")[0]} was amazing! Very welcoming and provided a beautiful spot to camp.",
  recommends: true
)

review167 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer14.id,
  text: "The property is at the very end of private country road and is nestled in a small valley that is surrounded by rolling hills. Amazing views!",
  recommends: true
)

review168 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer16.id,
  text: "The property is a work in progress, but the infrastructure allows all of the amenities that a camper could want.",
  recommends: true
)

review169 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer18.id,
  text: "There are solar showers on site, but since we only stayed for a night, we didn't need to access those at all.",
  recommends: true
)

review170 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer17.id,
  text: "There are many projects that are happening on the land, many of which exhibit the owners' connection and love for mother nature.",
  recommends: true
)

review171 = Review.create!(
  listing_id: listing11.id,
  reviewer_id: reviewer6.id,
  text: "One of my favorite features is the steam hut that is used for both traditional and recreational purposes and has been said to house nearly 20 people during certain occasions.",
  recommends: true
)

### Listing 12 Reviews ###

review172 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer8.id,
  text: "A great experience, as there is shade, a suspended bed, and a sandy plateau that allows to pitch a medium sized tent.",
  recommends: true
)

review173 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer11.id,
  text: "The site is on the water's edge but has plenty room to spread out and feel comfortable on the land. ",
  recommends: true
)

review174 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer14.id,
  text: "I don't know if I enjoyed the sounds of the running water or the bright, bright stars more, but both together were simply magnificent.",
  recommends: true
)

review175 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer17.id,
  text: "We definitely want to come back to this site and enjoy camping on the river during the summer!",
  recommends: true
)

review176 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer2.id,
  text: "This trip was absolutely amazing! #{host12.username.split(" ")[0]} was an amazing host — super accommodating and helpful not just to me, but all the guests staying on the property",
  recommends: true
)

review177 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer5.id,
  text: "Not only is the property breathtaking, but it sits at the base of the National Forest giving access to pristine water holes and beautiful hikes.",
  recommends: true
)

review178 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer9.id,
  text: "I recommend setting up your tent right by the water. It's cool when things get hot, and you'll find yourself visited by Tule, their dog, for frequent cool down dips in the river. Win win!",
  recommends: true
)

review179 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer12.id,
  text: "Gorgeous property, great views and about an hour drive from the national park!",
  recommends: true
)

review180 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer15.id,
  text: "One of the greatest camping experiences I've had.",
  recommends: true
)

review181 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer18.id,
  text: "It was so incredible to meet people who love and respect nature the way they do, I would go back in a heartbeat.",
  recommends: true
)

review182 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer3.id,
  text: "#{host12.username.split(" ")[0]} was a great host, and Tule the dog took care of us. Access to the river was quick and relatively easy. ",
  recommends: true
)

review183 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer6.id,
  text: "Phenomenal site with awesome hosts! #{host12.username.split(" ")[0]} was awesome, but Tule the dog was by far the best!",
  recommends: true
)

review184 = Review.create!(
  listing_id: listing12.id,
  reviewer_id: reviewer9.id,
  text: "This camp was the best I've been to so far and our host's are amazing and the river is awesome there's so much peace im definitely going back.",
  recommends: true
)