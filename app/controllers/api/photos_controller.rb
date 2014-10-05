module Api
  class PhotosController < ApiController
  	def show
  		# need this?
  	end

  	def index
      if params[:review_id]
    		@photos = Photo.where(review_id: params[:review_id])
      elsif params[:business_id]
        @business = Business.find(params[:business_id])
        @photos = @business.photos
      elsif params[:user_id]
        @user = User.find(params[:user_id])
        @photos = @user.photos
      end
      
      render :index
  	end

    def create
      @review = Review.find(params[:review_id])
      @photo = @review.photos.new(fp_url: params[:fp_url])

      if @photo.save
        render :show
      else
        render :json => @photo.errors, :status => :unprocessable_entity
      end
    end

    def destroy

    end

    def update

    end
  end
end