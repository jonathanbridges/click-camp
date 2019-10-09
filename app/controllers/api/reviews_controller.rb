class Api::ReviewsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def show
    @review = Review.find(params[:id])
    render json: @review
  end

  def index
    # @reviews = Review.includes(:listing).where(camper_id: current_user.id).order(check_in: :desc)
    @reviews = Review.all
    render json: @reviews
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update_attributes(review_params)
      render json: @review
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])

    if @review.destroy
      render json: @review
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(
      :reviewer_id,
      :listing_id,
      :text,
      :recommends
    )
  end 

end
