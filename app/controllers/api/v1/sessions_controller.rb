module Api
  module V1
    class SessionsController < BaseController
      skip_before_action :authenticate_user, only: [:create]

      def create
        @user = User.find_by(email: params[:email])
        
        if @user&.authenticate(params[:password])
          session[:session_token] = @user.session_token
          render json: UserBlueprint.render(@user), status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        if current_user
          session[:session_token] = nil
          head :no_content
        else
          render json: { error: 'You need to sign in before continuing' }, status: :unauthorized
        end
      end
    end
  end
end 