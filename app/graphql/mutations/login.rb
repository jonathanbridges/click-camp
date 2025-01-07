# frozen_string_literal: true

module Mutations
  class Login < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    type Types::AuthTokenType

    def resolve(email:, password:)
      user = User.find_by(email: email)
      
      if user&.authenticate(password)
        context[:login].call(user)
        {
          token: user.session_token,
          user: user
        }
      else
        raise GraphQL::ExecutionError.new(
          "Invalid email or password",
          extensions: {
            code: "UNAUTHORIZED",
            status: 401
          }
        )
      end
    end
  end
end 