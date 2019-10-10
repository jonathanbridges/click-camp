json.extract! @listing, :id, :name, :description, :cost, :host_id
json.photoUrls @listing.photos.map { |file| url_for(file) }
host = User.find(@listing.host_id)
json.extract! host, :username
json.hostPhotoUrl url_for(host.photo) if host.photo.attached?
