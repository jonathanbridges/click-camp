module Api
  module V1
    class ListingsController < BaseController
      skip_before_action :authenticate_user, only: [:index, :show]
      before_action :set_listing, only: [:show, :update, :destroy]
      
      def index
        listings = Listing.all
        Rails.logger.info "Total listings before filtering: #{listings.count}"

        if params[:neLat].present? && params[:neLng].present? && params[:swLat].present? && params[:swLng].present?
          # Use exact bounds if provided
          listings = listings.within_bounds(
            params[:neLat].to_f,  # north
            params[:swLat].to_f,  # south
            params[:neLng].to_f,  # east
            params[:swLng].to_f   # west
          )
          Rails.logger.info "Found #{listings.count} listings within bounds"
        elsif params[:originLat].present? && params[:originLng].present?
          # Fall back to radius search if only center coordinates provided
          lat = params[:originLat].to_f
          lng = params[:originLng].to_f
          radius = params[:radius].present? ? params[:radius].to_i : 50
          
          listings = listings.near_coordinates(lat, lng, radius)
          Rails.logger.info "Found #{listings.count} listings within #{radius} miles of [#{lat}, #{lng}]"
        end

        render json: ListingBlueprint.render(listings)
      end

      def show
        listing = Listing.find(params[:id])
        render json: ListingBlueprint.render(listing, view: :extended)
      end

      def create
        @listing = current_user.hosted_listings.build(listing_params)
        
        if @listing.save
          ImageProcessingJob.perform_later(@listing.id) if @listing.photos.attached?
          render json: ListingBlueprint.render(@listing), status: :created
        else
          render json: { errors: @listing.errors }, status: :unprocessable_entity
        end
      end

      private

      def set_listing
        @listing = Listing.find(params[:id])
      end

      def listing_params
        params.require(:listing).permit(
          :title, :description, :price_per_night, :max_guests,
          :lat, :lng, :address, :city, :state,
          photos: []
        )
      end

      def filter_params
        params.permit(
          :search, :min_price, :max_price,
          :check_in, :check_out,
          :lat, :lng, :radius
        )
      end
    end
  end
end 