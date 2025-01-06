module Api
  module V1
    class UsersController < BaseController
      skip_before_action :authenticate_user, only: [:create]
      before_action :set_user, only: [:show, :update]

      def show
        render json: UserBlueprint.render(@user)
      end

      def create
        @user = User.new(user_params)

        if @user.save
          session[:session_token] = @user.session_token
          render json: UserBlueprint.render(@user), status: :created
        else
          render json: { errors: @user.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @user == current_user && @user.update(user_params)
          render json: UserBlueprint.render(@user)
        else
          render json: { errors: @user.errors }, status: :unprocessable_entity
        end
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(
          :email, 
          :username, 
          :password,
          :avatar
        )
      end
    end
  end
end 