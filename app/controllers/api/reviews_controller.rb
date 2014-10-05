module Api
  class ReviewsController < ApiController
  	def show
  		@review = Review.find(params[:id])
  		render :show
  	end

    def index
      @reviews = Review.retrieve(params[:page])
      render :index
    end

  	def create
      @review = current_user.reviews.new(review_params)
      if @review.save
        render :show
      else
        render :json => @review.errors, :status => :unprocessable_entity
      end
  	end

  	def destroy

  	end

    def update
      @review = Review.where(user_id: current_user.id, business_id: params[:business_id]).first
      if @review.update(review_params)
        render :update
      else
        render :json => @review.errors, :status => :unprocessable_entity
      end
    end

    private

    def review_params
      params.require(:review).permit(:content, :stars, :business_id, :go_again)
    end
  end
end