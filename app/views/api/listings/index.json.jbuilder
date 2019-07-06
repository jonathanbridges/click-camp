json.array! @listings do |listing|
  json.extract! listing, :id, :name, :description
  json.photoUrl url_for(listing.photos[0])
end