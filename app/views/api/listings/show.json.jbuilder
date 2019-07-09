  json.extract! @listing, :id, :name, :description, :cost, :host_id
  json.photoUrls @listing.photos.map { |file| url_for(file) }

