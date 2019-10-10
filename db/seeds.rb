# This file should contain all the record creation needed to seed the database with its default values.
import 'byebug'
require 'open-uri'

User.delete_all
Location.delete_all
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
host_1.photo.attach(io: host_1_avatar, filename: "user12.jpg")


host2 = User.create!(
  username: 'Jeff B.',
  email: 'def@123.com',
  password: 'password'
)

host_2_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user10.jpg')
host_2.photo.attach(io: host_2_avatar, filename: "user10.jpg")

host3 = User.create!(
  username: 'Judy M.',
  email: 'ghasdfi@123.com',
  password: 'password'
)

host_3_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user13.jpg')
host_3.photo.attach(io: host_3_avatar, filename: "user13.jpg")

host4 = User.create!(
  username: 'Jerry P.',
  email: 'jkasdfal@123.com',
  password: 'password'
)

host_4_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user14.jpg')
host_4.photo.attach(io: host_4_avatar, filename: "user14.jpg")

host5 = User.create!(
  username: 'Erica S.',
  email: 'jkasdfal@123.com',
  password: 'password'
)

host_5_avatar = open('https://app-name-seeds.s3.us-west-1.amazonaws.com/user18.jpg')
host_5.photo.attach(io: host_5_avatar, filename: "user18.jpg")

host6 = User.create!(
  username: 'Benjamin G.',
  email: 'jklasdf@123.com',
  password: 'password'
)

host_6_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user3.jpg')
host_6.photo.attach(io: host_6_avatar, filename: "user3.jpg")

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
reviewer_1.photo.attach(io: reviewer_1_avatar, filename: "user1.jpg")

reviewer2 = User.create!(
  username: 'Kaydon L.',
  email: 'jkslasdf@1234.com',
  password: 'password'
)

reviewer_2_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user2.jpg')
reviewer_2.photo.attach(io: reviewer_2_avatar, filename: "user2.jpg")

reviewer3 = User.create!(
  username: 'Mike M.',
  email: 'jkslasdf@1234.com',
  password: 'password'
)

reviewer_3_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user4.jpg')
reviewer_3.photo.attach(io: reviewer_3_avatar, filename: "user4.jpg")

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
### 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18 ###

reviewer11 = User.create!(
  username: 'Steve K.',
  email: 'jaf@121234.com',
  password: 'password'
)

reviewer_11_avatar = open('https://app-name-seeds.s3-us-west-1.amazonaws.com/user16.jpg')
reviewer11.photo.attach(io: reviewer_11_avatar, filename: "user16.jpg")

### Locations ###

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

### Listings ###

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


listing4 = Listing.create!(
  host_id: host4.id, 
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


listing5 = Listing.create!(
  host_id: host5.id, 
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


listing6 = Listing.create!(
  host_id: host6.id, 
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
  text: "Utterly fantastic experience from start to finish. The directions provided were accurate and useful (like mentioning cell service dies around 45m south of the location - super glad we knew that in advance), the location was easy to find, and the host super friendly and welcoming.",
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
  text: "I was immediately put at ease when I arrived at camp and met the host, Jeff. He is super easy-going, helpful and flexible.",
  recommends: true
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

review25 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer9.id,
  text: "Excellent experience at this charming spot. Didn't want to leave. A short walk downhill to your own little heaven...",
  recommends: true
)

review26 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer11.id,
  text: "Incredible location overlooking the water. There is some highway noise but other than that it felt private and secluded.",
  recommends: true
)

review27 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer1.id,
  text: "Bathroom and access to drinking water are located in the house / at the top of the hill, so there will be some trips back and forth.",
  recommends: false
)

review28 = Review.create!(
  listing_id: listing3.id,
  reviewer_id: reviewer3.id,
  text: "Overall, a great experience and highly recommend!",
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
  text: "It is obvious that Roy takes great pride in his land and cares about the experience for his campers.",
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
  recommends: false
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