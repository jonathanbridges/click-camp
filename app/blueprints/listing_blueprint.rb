class ListingBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :description, :price_per_night, :lat, :lng, 
         :address, :city, :state, :host_id
  
  field :photo_urls do |listing|
    if listing.photos.attached?
      Rails.logger.debug "Photos are attached: #{listing.photos.count}"
      listing.photos.map do |photo|
        begin
          url = Rails.application.routes.url_helpers.rails_blob_url(photo)
          Rails.logger.debug "Generated URL: #{url}"
          url
        rescue => e
          Rails.logger.error "Error generating URL for photo: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")
          nil
        end
      end.compact
    else
      Rails.logger.debug "No photos attached for listing #{listing.id}"
      []
    end
  end

  view :extended do
    association :host, blueprint: UserBlueprint
    association :reviews, blueprint: ReviewBlueprint
    field :average_rating
  end
end 