module Api
  module V1
    class ReviewsController < BaseController
      before_action :set_review, only: [:update, :destroy]
      
      def index
        listing = Listing.find(params[:listing_id])
        @reviews = listing.reviews.includes(:reviewer).order(created_at: :desc)
        render json: ReviewBlueprint.render(@reviews)
      end

      def create
        listing = Listing.find(params[:listing_id])
        @review = current_user.reviews.build(review_params)
        @review.listing = listing

        if @review.save
          render json: ReviewBlueprint.render(@review), status: :created
        else
          render json: { errors: @review.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @review.update(review_params)
          render json: ReviewBlueprint.render(@review)
        else
          render json: { errors: @review.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @review.destroy
        head :no_content
      end

      private

      def set_review
        @review = current_user.reviews.find_by!(id: params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Review not found or unauthorized' }, status: :not_found
      end

      def review_params
        params.require(:review).permit(:content, :rating, :reservation_id)
      end
    end
  end
end 