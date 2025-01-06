module Api
  module V1
    class ReviewsController < BaseController
      def index
        @reviews = listing.reviews.includes(:user)
        render json: ReviewBlueprint.render(@reviews)
      end

      def create
        @review = current_user.reviews.build(review_params)
        @review.listing = listing

        if @review.save
          render json: ReviewBlueprint.render(@review), status: :created
        else
          render json: { errors: @review.errors }, status: :unprocessable_entity
        end
      end

      private

      def listing
        @listing ||= Listing.find(params[:listing_id])
      end

      def review_params
        params.require(:review).permit(:rating, :content, :reservation_id)
      end
    end
  end
end 