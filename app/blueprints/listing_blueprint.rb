class ListingBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :description, :price_per_night, :lat, :lng, 
         :address, :city, :state, :host_id, :max_guests

  field :photo_urls do |listing|
    if listing.photos.attached?
      listing.photos.map do |photo|
        Rails.application.routes.url_helpers.url_for(photo)
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
    field :unavailable_dates do |listing|
      listing.reservations
        .where('check_out > ?', Date.today)
        .flat_map { |r| (r.check_in..r.check_out).to_a }
        .map(&:to_s)
    end
  end
end 