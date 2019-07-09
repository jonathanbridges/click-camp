json.array! @listings do |listing|
  json.extract! listing, :id, :name, :description, :cost
  json.photoUrls listing.photos.map { |file| url_for(file) }
end

