json.array! @listings do |listing|
  json.extract! listing, :id, :name, :description, :cost,:lat, :lng
  json.rating Review.get_rating(listing.id)
  json.numberReviews Review.get_number_ratings(listing.id)
  json.photoUrls listing.photos.map { |file| url_for(file) }
end

