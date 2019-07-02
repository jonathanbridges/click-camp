class SessionsController < ApplicationController

	def new
		@user = User.new
	end

	def create
		@user = User.find_by_credentials(
		params[:user][:username],
		params[:user][:password]
		)

		if @user
			login(@user)
			redirect_to posts_url
		else
		flash.now[:errors] = ["Invalid Login Credentials"]
		render :new
		end
	end

	def destroy
		log_out
	end

end
