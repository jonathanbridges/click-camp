class ListingBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :description, :price_per_night, :lat, :lng, 
         :address, :city, :state
  
  field :image_urls do |listing|
    listing.images.map { |image| 
      Rails.application.routes.url_helpers.url_for(image)
    }
  end

  view :extended do
    association :host, blueprint: UserBlueprint
    association :reviews, blueprint: ReviewBlueprint
    field :average_rating
  end
end 