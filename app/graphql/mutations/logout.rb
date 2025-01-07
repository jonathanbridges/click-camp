# frozen_string_literal: true

module Mutations
  class Logout < BaseMutation
    type Boolean

    def resolve
      if context[:current_user]
        context[:logout].call
        true
      else
        raise GraphQL::ExecutionError.new(
          "You need to sign in before continuing",
          extensions: {
            code: "UNAUTHORIZED",
            status: 401
          }
        )
      end
    end
  end
end 