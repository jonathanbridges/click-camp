class Api::ListingsController < ApplicationController

  # skip_before_action :verify_authenticity_token

  def index 
    # @listings = Listing.all
    @listings = bounds ? Listing.in_bounds(bounds) : Listing.all

    # render json: @listings
    if @listings
      render :index
    else
      render json: ["Listings not found!"], status: 422
    end
  end

  def show
    @listing = Listing.find(params[:id])
    # render json: @listing
    render :show
  end

  private

  def listing_params
    params.require(:listing).permit(
      :host_id,
      :lat,
      :lng,
      :name,
      :description,
      :cost,
      photos: []
    )
  end

  def bounds
    params[:bounds]
  end

  def user_id
    params[:user_id]
  end

end
