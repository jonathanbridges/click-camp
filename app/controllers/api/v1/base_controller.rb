module Api
  module V1
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user
      
      private
      
      def authenticate_user
        return if current_user
        
        render json: { error: 'You need to sign in before continuing' }, 
               status: :unauthorized
      end

      def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
      end

      def login!(user)
        session[:session_token] = user.session_token
        @current_user = user
      end

      def logout!
        current_user&.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
      end

      def logged_in?
        !!current_user
      end
    end
  end
end 