class ListingQuery
  attr_reader :params

  def initialize(params = {})
    @params = params
  end

  def results
    listings = Listing.all
    
    listings = apply_location_filter(listings)
    listings = apply_price_filter(listings)
    listings = apply_date_filter(listings)
    listings = apply_search_filter(listings)
    
    listings
  end

  private

  def apply_location_filter(listings)
    return listings unless params[:lat].present? && params[:lng].present?

    listings.near_coordinates(
      params[:lat].to_f,
      params[:lng].to_f,
      params[:radius] || 50
    )
  end

  def apply_price_filter(listings)
    listings = listings.where("price_per_night >= ?", params[:min_price]) if params[:min_price].present?
    listings = listings.where("price_per_night <= ?", params[:max_price]) if params[:max_price].present?
    listings
  end

  def apply_date_filter(listings)
    return listings unless params[:check_in].present? && params[:check_out].present?

    listings.available_between(params[:check_in], params[:check_out])
  end

  def apply_search_filter(listings)
    return listings unless params[:search].present?

    listings.search_by_location(params[:search])
  end
end 