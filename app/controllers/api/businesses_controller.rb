module Api
  class BusinessesController < ApiController
    def create

    end

    def destroy

    end

    def update

    end

  	def show
  		@business = Business.find(params[:id])
      render :show
  	end

  	def index
      # category request
      if params[:category]
        category = params[:category]

        words = params[:category].split '&'

        if words.length > 1
          category = words.map { |word| split_on_caps(word) }.join " & "
        else # no amp
          category = split_on_caps(category)
        end

        @businesses = Business.where(category: category)
        render :index

      else #normal request
        unless params[:query]
      		@businesses = Business.all
          render :index
        else #map request
          x_range = params[:query][0]
          y_range = params[:query][1]
          center = params[:query][2]

          @businesses = Business.find_in_bounds(x_range, y_range)
          @closest = Business.find_closest(center, @businesses)

          if @closest
            @businesses = @businesses.where.not(id: @closest.id)
          else
            # fix later
            @closest = @businesses.first
          end

          render :range
        end
      end
  	end

    private
    # helper method to split a string with caps with spaces
    # i.e. "FoodCarts" -> "Food Carts"
    def split_on_caps(word)
      word.split(/(?=[A-Z])/).join(" ")
    end

  end
end