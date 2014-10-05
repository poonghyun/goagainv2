module Api
  class UsersController < ApiController
  	def show
  		@user = User.find(params[:id])
      render :show
  	end

		def update
			@user = User.find(params[:id])
			@user.update(about_me: params[:about_me]) if params[:about_me]
      @user.update(fp_url: params[:fp_url]) if params[:fp_url]
			render :update
		end
  end
end