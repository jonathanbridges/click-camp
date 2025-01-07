# frozen_string_literal: true

module Types
  class ReviewType < Types::BaseObject
    field :id, ID, null: false
    field :content, String, null: false
    field :rating, Integer, null: false
    field :reviewerId, Integer, null: false, method: :reviewer_id
    field :listingId, Integer, null: false, method: :listing_id
    field :reservationId, Integer, null: false, method: :reservation_id
    field :reviewer, Types::UserType, null: false
    field :listing, Types::ListingType, null: false
    field :createdAt, GraphQL::Types::ISO8601DateTime, null: false, method: :created_at
    field :updatedAt, GraphQL::Types::ISO8601DateTime, null: false, method: :updated_at
  end
end 