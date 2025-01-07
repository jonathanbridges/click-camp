# frozen_string_literal: true

module Resolvers
  class ReviewsResolver < Resolvers::BaseResolver
    type [Types::ReviewType], null: false

    argument :listing_id, ID, required: true

    def resolve(listing_id:)
      Review.where(listing_id: listing_id).includes(:reviewer)
    end
  end
end 