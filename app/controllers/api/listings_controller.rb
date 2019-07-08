class Api::ListingsController < ApplicationController

  def index 
    @listings = Listing.all
    # render json: @listings
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    # render json: @listing
    render :show
  end

  def listing_params
    params.require(:listing).permit(
      :host_id,
      :location_id,
      :name,
      :description,
      :cost,
      photos: []
    )
  end

end
