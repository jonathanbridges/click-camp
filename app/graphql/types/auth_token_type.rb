# frozen_string_literal: true

module Types
  class AuthTokenType < Types::BaseObject
    field :token, String, null: false
    field :user, Types::UserType, null: false
  end
end 