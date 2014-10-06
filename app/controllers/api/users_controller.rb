module Api
  class UsersController < ApiController
  	def show
  		@user = User.find(params[:id])
      render :show
  	end

		def update
			@user = User.find(params[:id])
			@user.update(about_me: params[:about_me]) if params[:about_me]
      @user.update(avatar_url: params[:avatar_url]) if params[:avatar_url]
			render :update
		end
  end
end