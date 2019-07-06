class Api::ListingsController < ApplicationController

  def index 
    @listings = Listing.all
    # render json: @listings
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render json: @listing
  end

  def listing_params
    params.require(:listing).permit(
      :host_id,
      :location_id,
      :name,
      :description,
      :cost,
      :photo
    )
  end

end
