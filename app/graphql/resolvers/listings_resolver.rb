# frozen_string_literal: true

module Resolvers
  class ListingsResolver < Resolvers::BaseResolver
    type [Types::ListingType], null: false

    argument :bounds, GraphQL::Types::JSON, required: false,
      description: "Map bounds in format: { ne: { lat: float, lng: float }, sw: { lat: float, lng: float } }"

    def resolve(bounds: nil)
      listings = Listing.all

      if bounds
        listings = listings.where(
          "lat <= ? AND lat >= ? AND lng <= ? AND lng >= ?",
          bounds["ne"]["lat"],
          bounds["sw"]["lat"],
          bounds["ne"]["lng"],
          bounds["sw"]["lng"]
        )
      end

      listings
    end
  end
end 