class ListingBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :description, :price_per_night, :lat, :lng, 
         :address, :city, :state, :host_id

  field :photo_urls do |listing|
    if listing.photos.attached?
      listing.photos.map do |photo|
        Rails.application.routes.url_helpers.rails_storage_proxy_url(photo)
      rescue => e
        Rails.logger.error "Error generating URL for photo: #{e.message}"
        nil
      end.compact
    else
      []
    end
  end

  view :extended do
    association :host, blueprint: UserBlueprint
    association :reviews, blueprint: ReviewBlueprint
    field :average_rating
  end
end 