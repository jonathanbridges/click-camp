class Api::SessionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render json: @user
    else
      render json: ["Invalid Login Credentials"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      log_out
      render json: @user
    else
      render json: ["Nobody signed in"], status: 404
    end
  end

end
