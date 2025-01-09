module Api
  module V1
    class BaseController < ApplicationController
      before_action :authenticate_user
      
      private
      
      def authenticate_user
        Rails.logger.info "============ Session Debug ============"
        Rails.logger.info "Session token: #{session[:session_token]}"
        Rails.logger.info "Session data: #{session.to_h}"
        Rails.logger.info "Current user: #{current_user&.inspect}"
        Rails.logger.info "======================================"
        
        return if current_user
        
        render json: { error: 'You need to sign in before continuing' }, 
               status: :unauthorized
      end

      def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
      end
    end
  end
end 