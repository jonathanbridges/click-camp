json.extract! @listing, :id, :host_id, :lat, :lng, :name, :description, :cost
host = User.find(@listing.host_id)
json.hostName host.username
json.rating Review.get_rating(@listing.id)
json.numberReviews Review.get_number_ratings(@listing.id)
json.photoUrls @listing.photos.map { |file| url_for(file) }
json.hostPhotoUrl url_for(host.photo) if host.photo.attached?