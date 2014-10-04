class SessionsController < ApplicationController
	def create
		user = User.find_by_credentials(params[:user][:username], params[:user][:password])

		if user.nil?
			flash.now[:errors] = ["Invalid credentials"]
      render :new
		else
			login!(user)
			redirect_to root_url
		end
	end

	def new
		if current_user
			redirect_to root_url
		else
			render :new
		end
	end

	def destroy
    logout!
    redirect_to new_session_url
	end
end