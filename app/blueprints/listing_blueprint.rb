class ListingBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :description, :price_per_night, :lat, :lng, 
         :address, :city, :state, :host_id
  
  field :photo_urls do |listing|
    listing.photos.map { |photo| 
      Rails.application.routes.url_helpers.url_for(photo)
    }
  end

  view :extended do
    association :host, blueprint: UserBlueprint
    association :reviews, blueprint: ReviewBlueprint
    field :average_rating
  end
end 