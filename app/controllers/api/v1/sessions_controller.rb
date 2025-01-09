module Api
  module V1
    class SessionsController < BaseController
      skip_before_action :authenticate_user, only: [:create]

      def create
        @user = User.find_by(email: params[:email])
        
        if @user&.authenticate(params[:password])
          # Reset the session to ensure a fresh state
          reset_session
          
          # Set the session token
          session[:session_token] = @user.session_token
          @current_user = @user

          Rails.logger.info "============ Session Debug ============"
          Rails.logger.info "Session ID: #{session.id}"
          Rails.logger.info "Session token: #{session[:session_token]}"
          Rails.logger.info "Session data: #{session.to_h}"
          Rails.logger.info "Cookies: #{cookies.to_h}"
          Rails.logger.info "======================================"
          
          render json: UserBlueprint.render(@user), status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        reset_session
        head :no_content
      end
    end
  end
end 