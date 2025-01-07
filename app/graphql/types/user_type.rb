# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :listings, [Types::ListingType], null: false
    field :createdAt, GraphQL::Types::ISO8601DateTime, null: false, method: :created_at
    field :updatedAt, GraphQL::Types::ISO8601DateTime, null: false, method: :updated_at
  end
end 