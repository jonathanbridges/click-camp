module Api
  module V1
    class ListingsController < BaseController
      skip_before_action :authenticate_user, only: [:index, :show]
      before_action :set_listing, only: [:show, :update, :destroy]

      def index
        listings = Listing.all
        render json: ListingBlueprint.render(listings)
      end

      def show
        listing = Listing.find(params[:id])
        render json: ListingBlueprint.render(listing, view: :extended)
      end

      def create
        @listing = current_user.hosted_listings.build(listing_params)
        
        if @listing.save
          ImageProcessingJob.perform_later(@listing.id) if @listing.images.attached?
          GeocodingJob.perform_later(@listing.id)
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
          :title, :description, :price_per_night,
          :lat, :lng, :address, :city, :state,
          images: []
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