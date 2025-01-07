# frozen_string_literal: true

module Types
  class ListingType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :pricePerNight, Integer, null: false, method: :price_per_night
    field :address, String, null: false
    field :city, String, null: false
    field :state, String, null: false
    field :lat, Float
    field :lng, Float
    field :active, Boolean, null: false
    field :hostId, Integer, null: false, method: :host_id
    field :host, Types::UserType, null: false, method: :host
    field :createdAt, GraphQL::Types::ISO8601DateTime, null: false, method: :created_at
    field :updatedAt, GraphQL::Types::ISO8601DateTime, null: false, method: :updated_at
  end
end 