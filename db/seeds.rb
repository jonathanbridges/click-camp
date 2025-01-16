# This file should contain all the record creation needed to seed the database with its default values.
require 'open-uri'
require 'active_storage'

puts "Clearing existing data..."
# First remove attachments to prevent orphaned blobs
ActiveStorage::Attachment.all.each { |attachment| attachment.purge }
[Review, Reservation, Listing, User].each(&:delete_all)

def find_or_create_blob(key, url)
  # Try to find by key first
  existing_blob = ActiveStorage::Blob.find_by(key: key)
  
  # If not found by key, try to find by filename
  existing_blob ||= ActiveStorage::Blob.find_by(filename: key)
  
  if existing_blob
    return existing_blob
  end

  begin
    file = URI.open(url)
    blob = ActiveStorage::Blob.create_and_upload!(
      io: file,
      filename: key
    )
    blob
  rescue => e
    puts "Error creating blob for #{key}: #{e.message}"
    raise e
  end
end

S3_BUCKET_URL = Rails.application.credentials.dig(:aws, :bucket_url);

puts "Creating hosts..."
HOSTS = [
  ['Heidi G.', 'user12.jpg'],
  ['Jeff B.', 'user10.jpg'],
  ['Judy M.', 'user13.jpg'],
  ['Jerry P.', 'user14.jpg'],
  ['Erica S.', 'user18.jpg'],
  ['Benjamin G.', 'user3.jpg'],
  ['Emmanuel T.', 'user19.jpg'],
  ['Levi T.', 'user20.jpg'],
  ['Terry P.', 'user21.jpg'],
  ['Lindsay H.', 'user22.jpg'],
  ['Charlie K.', 'user23.jpg'],
  ['Thatcher B.', 'user24.jpg']
].map.with_index do |(name, avatar), i|
  user = User.create!(
    username: name,
    email: "host#{i}@example.com",
    password: 'password',
    created_at: rand(6..24).months.ago
  )
  
  blob = find_or_create_blob(
    avatar,
    "#{S3_BUCKET_URL}/#{avatar}"
  )
  
  user.avatar.attach(blob)
  user
end

puts "Creating reviewers..."
REVIEWERS = [
  ['Emrys B.', 'user1.jpg'],
  ['Kaydon L.', 'user2.jpg'],
  ['Mike M.', 'user4.jpg'],
  ['Ryley C.', 'user5.jpg'],
  ['Rida W.', 'user6.jpg'],
  ['Bret G.', 'user9.jpg'],
  ['Meredith V.', 'user7.jpg'],
  ['Reggie S.', 'user11.jpg'],
  ['Lexi P.', 'user17.jpg'],
  ['Aaron B.', 'user15.jpg'],
  ['Steve K.', 'user16.jpg'],
  ['Jackson K.', 'user25.jpg'],
  ['Cortnee K.', 'user26.jpg'],
  ['Robert D.', 'user27.jpg'],
  ['Nami N.', 'user28.jpg'],
  ['Jack W.', 'user29.jpg'],
  ['Olivia K.', 'user30.jpg'],
  ['Joshua S.', 'user31.jpg']
].map.with_index do |(name, avatar), i|
  user = User.create!(
    username: name,
    email: "reviewer#{i}@example.com",
    password: 'password',
    created_at: rand(6..24).months.ago
  )
  
  # Use the specified format for user avatars
  blob = find_or_create_blob(
    avatar,
    "#{S3_BUCKET_URL}/#{avatar}"
  )
  user.avatar.attach(blob)
  user
end

puts "Creating guest user..."
guest = User.create!(
  username: 'clickCamper',
  email: 'clickCamper@camp.site',
  password: 'password',
  created_at: 12.months.ago
)

blob = find_or_create_blob(
  "campicon.png",
  "https://app-name-seeds.s3.us-west-1.amazonaws.com/campicon.png"
)
guest.avatar.attach(blob)

puts "Creating listings..."
listings_data = [
  {
    host: HOSTS[0],
    title: 'Aurora HOA',
    description: 'Experience the best camping in northern CA! All campsites have fire pits and unparalled access to star-viewing.',
    price_per_night: 45,
    address: '123 Forest Road',
    city: 'Half Moon Bay',
    state: 'CA',
    lat: 37.480498,
    lng: -122.317929,
    photo_count: 6
  },
  {
    host: HOSTS[1],
    title: 'Marshmellow Marsh',
    description: 'Free smores are delivered upon your arrival at Marshmellow Marsh! A quick walk to the bog esplanade.',
    price_per_night: 25,
    address: '456 Marsh Road',
    city: 'Fairfield',
    state: 'CA',
    lat: 38.199076,
    lng: -122.018342,
    photo_count: 6
  },
  {
    host: HOSTS[2],
    title: 'Wine Country Wagons',
    description: 'Rose by day, and hay by night. Drink the finest north bay wines and sleep in our premium wooden wagons.',
    price_per_night: 75,
    address: '789 Vineyard Lane',
    city: 'Sonoma',
    state: 'CA',
    lat: 38.273978,
    lng: -122.242194,
    photo_count: 6
  },
  {
    host: HOSTS[3],
    title: 'Hammock Forest',
    description: 'Relax to the max hanging out between two trees in hammock forest! Sheep are available for petting and Instagram moments.',
    price_per_night: 65,
    address: '321 Forest Way',
    city: 'Mill Valley',
    state: 'CA',
    lat: 37.929470,
    lng: -122.582165,
    photo_count: 6
  },
  {
    host: HOSTS[4],
    title: 'Sierra Forest Farm',
    description: 'Walking distance to public access at the Russian river, and a short 20 minute drive from the coast. Close to the regions best wineries and restaurants.',
    price_per_night: 40,
    address: '654 Mountain Road',
    city: 'Los Gatos',
    state: 'CA',
    lat: 37.173290,
    lng: -121.909813,
    photo_count: 6
  },
  {
    host: HOSTS[5],
    title: 'Beachside Bungalow',
    description: 'Whalewatchers delight! Free binoculars, travel guidebooks from the 1980s, and a grand view of the Pacific Ocean.',
    price_per_night: 45,
    address: '987 Coastal Highway',
    city: 'Bodega Bay',
    state: 'CA',
    lat: 38.002312,
    lng: -123.009124,
    photo_count: 6
  },
  {
    host: HOSTS[6],
    title: 'Berkeley Bivouac',
    description: 'Who knew camping was so close to the city? Escape the real world Berkeley style, reading a book, climbing the local hills, or simply sitting around the fire and talking about politics.',
    price_per_night: 65,
    address: '246 Hill Road',
    city: 'Berkeley',
    state: 'CA',
    lat: 37.886947,
    lng: -122.239774,
    photo_count: 6
  },
  {
    host: HOSTS[7],
    title: 'Guerneville Gulch',
    description: 'Walking distance to public access at the Russian river, and a short 20 minute drive from the coast. Close to the regions best wineries and restaurants.',
    price_per_night: 70,
    address: '135 River Road',
    city: 'Guerneville',
    state: 'CA',
    lat: 38.478108,
    lng: -122.993168,
    photo_count: 6
  },
  {
    host: HOSTS[8],
    title: 'Leaning Leanto',
    description: 'Charming leanto nearly untouched by mankind. Enjoy the sounds of coyotes rummaging through your dry goods for a snack.',
    price_per_night: 25,
    address: '864 Wilderness Way',
    city: 'Petaluma',
    state: 'CA',
    lat: 38.188452,
    lng: -122.364720,
    photo_count: 6
  },
  {
    host: HOSTS[9],
    title: 'Big Sur Beachfront',
    description: 'Nestled among the coastal trees you will find a cozy break from the elements, but sweeping views of the Big Sur coastline. Great hikes all along the beach trails and up into the woods to the East.',
    price_per_night: 50,
    address: '753 Coastal Trail',
    city: 'Big Sur',
    state: 'CA',
    lat: 37.261732,
    lng: -122.410615,
    photo_count: 6
  },
  {
    host: HOSTS[10],
    title: 'Monte Bello Preserve',
    description: 'A short drive off skyline drive we have a wonderful spot that we are now sharing with campers. A very rewarding hike nearby is Black Mountain, where you can see back into and over the Bay. Only 1 hour drive from downtown San Francisco',
    price_per_night: 70,
    address: '159 Skyline Boulevard',
    city: 'Los Altos',
    state: 'CA',
    lat: 37.318247,
    lng: -122.154742,
    photo_count: 6
  },
  {
    host: HOSTS[11],
    title: 'Vacaville Village Retreat',
    description: 'People from all over the world flock to Vacaville for the annual frozen man ice festival every January. There is no better place to stay than here at Vacaville Village Retreat, where you have quick access to all of the festivities, but are also secluded enough to just sit back and let the day pass by. 😎',
    price_per_night: 70,
    address: '951 Village Road',
    city: 'Vacaville',
    state: 'CA',
    lat: 38.356072,
    lng: -122.008822,
    photo_count: 6
  }
]

LISTINGS = listings_data.each_with_index.map do |listing_data, index|
  listing = Listing.create!(
    listing_data.except(:photo_count).merge(
      max_guests: [4, 6, 8, 2, 4, 6, 3, 5, 4][index] || 4  # Default to 4 if index out of bounds
    )
  )
  
  listing_data[:photo_count].times do |i|
    photo_key = "site-#{index + 1}-#{i+1}.jpg"
    blob = find_or_create_blob(
      photo_key,
      "#{S3_BUCKET_URL}/#{photo_key}"
    )
    listing.photos.attach(blob)
  end
  listing
end

puts "Creating reservations..."
reservation1 = Reservation.create!(
  camper: guest,
  listing: LISTINGS[2], # Wine Country Wagons
  check_in: Time.now + 1000000,
  check_out: Time.now + 1250000,
  guest_count: 2
)

reservation2 = Reservation.create!(
  camper: guest,
  listing: LISTINGS[1], # Marshmellow Marsh
  check_in: Time.now - 1500000,
  check_out: Time.now - 1000000,
  guest_count: 2
)

reservation2 = Reservation.create!(
  camper: guest,
  listing: LISTINGS[4], # Sierra Forest Farm
  check_in: Time.now - 2500000,
  check_out: Time.now - 2000000,
  guest_count: 2
)

reservation2 = Reservation.create!(
  camper: guest,
  listing: LISTINGS[5], # Beachside Bungalow
  check_in: Time.now - 4000000,
  check_out: Time.now - 3500000,  
  guest_count: 2
)

puts "Creating reviews..."
REVIEWS = [
  # Reviews for Aurora HOA (LISTINGS[0])
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[0],
    content: "Incredible location and views of the ocean. Close to beautiful hiking.",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[1],
    content: "Utterly fantastic experience from start to finish. The directions provided were accurate and useful, the location was easy to find, and the host super friendly and welcoming.",
    rating: 5,
    stay_length: 2
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[2],
    content: "The site itself was jaw-dropping gorgeous and felt very private (though we were the only campers there at the time - ymmv on privacy, but its set up to have multiple relatively private sites).",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[3],
    content: "There were so many animals! We saw jellyfish, seals, pelicans, so many birds, even a couple whale spouts in the distance. We also had the company of one of the property's cats, who was the sweetest feline I think I've ever met.",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[4],
    content: "My only regret is we didn't book a longer trip. If you're thinking of booking, do it, the pictures don't do the place justice.",
    rating: 5,
    stay_length: 2
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[5],
    content: "If you can believe it, this spot is even more beautiful than the photos.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[6],
    content: "There's a wicked fire pit, grill, and bench, plus tons of primo cliff perches--and you get 'em all to yourself. Just make sure you pick up firewood on your way in.",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[0],
    reviewer: REVIEWERS[7],
    content: "If you don't feel like cooking, the Ocean Cove Bar and Grill is only a two-minute walk down the road. You're also a short drive from Salt Point Park hiking (to your north) and Salmon Creek surfing (to your south.)",
    rating: 5,
    stay_length: 5
  },

  # Reviews for Marshmellow Marsh (LISTINGS[1])
  {
    listing: LISTINGS[1],
    reviewer: REVIEWERS[10],
    content: "Unlike conventional campsites, there is no picnic bench for meals, so bring some camping chairs of your own. Also be sure to bring firewood.",
    rating: 4,
    stay_length: 2
  },
  {
    listing: LISTINGS[1],
    reviewer: REVIEWERS[9],
    content: "We got to spend lots of quality time with Jeff's two adorable cats - for us, this was an incredible addition; they're adorable and adoring :) However, if you're allergic to cats, it might be tough as they like to drop in quite a bit.",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[1],
    reviewer: REVIEWERS[8],
    content: "Great campsite!! Right on the cliffs overlooking the ocean, it is nestled in a cove so there's really not much wind as well.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[1],
    reviewer: REVIEWERS[7],
    content: "The best part was the owner's cat Simone! She hung out with us the whole time we were there and even slept in the tent of one of my friends.",
    rating: 5,
    stay_length: 2
  },
  {
    listing: LISTINGS[1],
    reviewer: REVIEWERS[6],
    content: "If you don't like cats - this is not the campsite for you. The cat is very insistently cuddly :)",
    rating: 4,
    stay_length: 3
  },
  {
    listing: LISTINGS[1],
    reviewer: REVIEWERS[5],
    content: "I wasn't ready for the cats. I have an allergy and ended up spending most of my time shooing them away with a quidditch stick",
    rating: 2,
    stay_length: 1
  },

  # Reviews for Wine Country Wagons (LISTINGS[2])
  {
    listing: LISTINGS[2],
    reviewer: REVIEWERS[4],
    content: "This place is magic. Great, communicative host and the place is truly amazing.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[2],
    reviewer: REVIEWERS[6],
    content: "Sleeping to the sounds of the ocean pounding up against the cliffs puts you to sleep like a baby!",
    rating: 5,
    stay_length: 3
  },

  # Reviews for Hammock Forest (LISTINGS[3])
  {
    listing: LISTINGS[3],
    reviewer: REVIEWERS[2],
    content: "Very well thought out and cared for space, the hammocks are sturdy and well-positioned between the trees. Perfect for summer afternoons!",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[3],
    reviewer: REVIEWERS[6],
    content: "The host, location, price, ease of access to town all make this a prime location. The composting toilet was clean and well-maintained.",
    rating: 4,
    stay_length: 2
  },
  {
    listing: LISTINGS[3],
    reviewer: REVIEWERS[9],
    content: "I love everything about this amazing spot! The sheep were so friendly and the outdoor shower had plenty of hot water. In October, the fall colors were spectacular.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[3],
    reviewer: REVIEWERS[3],
    content: "When we needed something the host was nearby, otherwise we were left to do our own thing. The solar-powered lights along the paths were really helpful at night.",
    rating: 4,
    stay_length: 2
  },
  {
    listing: LISTINGS[3],
    reviewer: REVIEWERS[7],
    content: "The hammocks were a bit too close to other campsites for my taste. Could hear neighboring conversations clearly.",
    rating: 3,
    stay_length: 3
  },

  # Reviews for Sierra Forest Farm (LISTINGS[4])
  {
    listing: LISTINGS[4],
    reviewer: REVIEWERS[11],
    content: "It is obvious that the owner takes great pride in their land. The spring wildflowers were breathtaking, and the provided camp kitchen had everything we needed.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[4],
    reviewer: REVIEWERS[10],
    content: "Each spot has a nice tent pad, fire ring with grill grate, and solar shower. However, the water pressure was quite low during our stay.",
    rating: 4,
    stay_length: 3
  },
  {
    listing: LISTINGS[4],
    reviewer: REVIEWERS[9],
    content: "There is a compost toilet a short walk away with a magnificent view! Just be prepared for mosquitoes in the summer months.",
    rating: 4,
    stay_length: 2
  },
  {
    listing: LISTINGS[4],
    reviewer: REVIEWERS[8],
    content: "The dishwashing station was really convenient, but the recycling bins were full our entire stay. Winter camping here was peaceful but very cold!",
    rating: 3,
    stay_length: 2
  },

  # Reviews for Beachside Bungalow (LISTINGS[5])
  {
    listing: LISTINGS[5],
    reviewer: REVIEWERS[8],
    content: "The whale watching was incredible in March! The provided binoculars were high quality, and the elevated platform gave us perfect views.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[5],
    reviewer: REVIEWERS[9],
    content: "There's a covered shelter area with a grill that saved us during an unexpected rain shower. The all-weather tent platforms are genius.",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[5],
    reviewer: REVIEWERS[17],
    content: "Summer fog can be pretty thick here - couldn't see the ocean at all some mornings. The fog horn was also quite loud.",
    rating: 3,
    stay_length: 2
  },
  {
    listing: LISTINGS[5],
    reviewer: REVIEWERS[15],
    content: "The hot outdoor shower was amazing after a cold morning of tide pooling. Wish the wifi reached the campsites though.",
    rating: 4,
    stay_length: 3
  },

  # Reviews for Berkeley Bivouac (LISTINGS[6])
  {
    listing: LISTINGS[6],
    reviewer: REVIEWERS[17],
    content: "Perfect mix of nature and city convenience. The provided portable power stations were great for charging devices.",
    rating: 5,
    stay_length: 2
  },
  {
    listing: LISTINGS[6],
    reviewer: REVIEWERS[15],
    content: "Beautiful in spring with all the wildflowers, but the nearby university can be noisy during events.",
    rating: 4,
    stay_length: 3
  },
  {
    listing: LISTINGS[6],
    reviewer: REVIEWERS[13],
    content: "The communal fire pit area led to great conversations with other campers. Some light pollution from the city affects stargazing.",
    rating: 4,
    stay_length: 4
  },

  # Reviews for Guerneville Gulch (LISTINGS[7])
  {
    listing: LISTINGS[7],
    reviewer: REVIEWERS[12],
    content: "The campgrounds were lovely, and right across from river access. The kayak storage racks were super convenient, and the host even lent us some life jackets!",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[7],
    reviewer: REVIEWERS[11],
    content: "The communal cooking area is well-equipped with a sink and propane stoves, but during peak summer weekends it gets pretty crowded.",
    rating: 4,
    stay_length: 3
  },
  {
    listing: LISTINGS[7],
    reviewer: REVIEWERS[14],
    content: "We loved camping here in spring! The property is beautiful with wildflowers everywhere. The provided wheelbarrows for hauling gear were a thoughtful touch.",
    rating: 5,
    stay_length: 2
  },
  {
    listing: LISTINGS[7],
    reviewer: REVIEWERS[13],
    content: "Great spot, but the river was too high for swimming in winter. The heated bathhouse made up for it though!",
    rating: 4,
    stay_length: 2
  },

  # Reviews for Leaning Leanto (LISTINGS[8])
  {
    listing: LISTINGS[8],
    reviewer: REVIEWERS[7],
    content: "Rolling hills, vineyards all around, and a farm full of animals. The lean-to's roof leaked during the rain though.",
    rating: 3,
    stay_length: 2
  },
  {
    listing: LISTINGS[8],
    reviewer: REVIEWERS[8],
    content: "Host is great, showing us around the property. The outdoor kitchen needs some maintenance - several burners weren't working.",
    rating: 3,
    stay_length: 3
  },
  {
    listing: LISTINGS[8],
    reviewer: REVIEWERS[9],
    content: "The tent site is large and flat, nicely shaded by tall trees. Fall temperatures were perfect for hiking the nearby trails.",
    rating: 4,
    stay_length: 4
  },
  {
    listing: LISTINGS[8],
    reviewer: REVIEWERS[10],
    content: "So quiet at night! The provided bear boxes were appreciated, though we didn't see any wildlife bigger than deer.",
    rating: 4,
    stay_length: 2
  },

  # Reviews for Big Sur Beachfront (LISTINGS[9])
  {
    listing: LISTINGS[9],
    reviewer: REVIEWERS[11],
    content: "The coastal views are unmatched! Each site has its own wind shelter, which was crucial during our stormy December stay.",
    rating: 5,
    stay_length: 3
  },
  {
    listing: LISTINGS[9],
    reviewer: REVIEWERS[12],
    content: "Summer brought amazing sunsets and perfect beach weather. The outdoor shower's solar heating wasn't quite enough on foggy days.",
    rating: 4,
    stay_length: 4
  },
  {
    listing: LISTINGS[9],
    reviewer: REVIEWERS[13],
    content: "Spring wildflowers were incredible! The composting toilet was well-maintained, but the walk there is quite steep.",
    rating: 4,
    stay_length: 2
  },
  {
    listing: LISTINGS[9],
    reviewer: REVIEWERS[14],
    content: "October camping was peaceful with few other guests. The provided maps of tide pools were super helpful!",
    rating: 5,
    stay_length: 3
  },

  # Reviews for Monte Bello Preserve (LISTINGS[10])
  {
    listing: LISTINGS[10],
    reviewer: REVIEWERS[6],
    content: "Amazing stargazing in winter when the air is crisp! The elevated tent platforms kept us dry during the rain.",
    rating: 5,
    stay_length: 2
  },
  {
    listing: LISTINGS[10],
    reviewer: REVIEWERS[8],
    content: "Spring brought lots of bird activity - the provided bird guide was well-used. Some trail markers need updating.",
    rating: 4,
    stay_length: 3
  },
  {
    listing: LISTINGS[10],
    reviewer: REVIEWERS[10],
    content: "Summer fog created magical mornings, but the solar lights weren't very effective on cloudy days.",
    rating: 3,
    stay_length: 4
  },
  {
    listing: LISTINGS[10],
    reviewer: REVIEWERS[12],
    content: "Fall colors were stunning! The communal fire pit area is well-designed with good seating and wind protection.",
    rating: 5,
    stay_length: 3
  },

  # Reviews for Vacaville Village Retreat (LISTINGS[11])
  {
    listing: LISTINGS[11],
    reviewer: REVIEWERS[7],
    content: "Came for the January ice festival - the heated yurt was a lifesaver! Great hot chocolate station in the common area.",
    rating: 5,
    stay_length: 4
  },
  {
    listing: LISTINGS[11],
    reviewer: REVIEWERS[9],
    content: "Spring camping was lovely but the ground was quite muddy. The raised walkways helped though!",
    rating: 4,
    stay_length: 2
  },
  {
    listing: LISTINGS[11],
    reviewer: REVIEWERS[11],
    content: "Summer brought too many mosquitoes - the provided nets had some holes. The outdoor movie screen was a fun touch!",
    rating: 3,
    stay_length: 3
  },
  {
    listing: LISTINGS[11],
    reviewer: REVIEWERS[13],
    content: "Perfect fall weather! The pumpkin carving station in October was unexpected and fun. Wish the wifi was more reliable.",
    rating: 4,
    stay_length: 2
  }
].each_with_index do |review_data, index|
  # Calculate dates that ensure no overlapping reservations by using the index
  # This will space out reservations by 15 days each, working backwards from 30 days ago
  stay_length = review_data.delete(:stay_length)
  base_date = 30.days.ago
  check_out = base_date - (index * 15).days
  check_in = check_out - stay_length.days
  
  # Create a reservation for each review (all in the past)
  reservation = Reservation.create!(
    camper: review_data[:reviewer],
    listing: review_data[:listing],
    check_in: check_in,
    check_out: check_out,
    guest_count: rand(1..4)
  )
  
  # Create review with a random creation date between 1-6 months ago
  review_created_at = rand(1..6).months.ago
  Review.create!(
    review_data.merge(
      reservation: reservation,
      created_at: review_created_at,
      updated_at: review_created_at
    )
  )
end

puts "Cleaning up orphaned blobs..."
ActiveStorage::Blob.unattached.find_each(&:purge)

puts "Seed data created successfully!"