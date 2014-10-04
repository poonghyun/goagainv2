class Business < ActiveRecord::Base
	validates :name, :category, :price, :x_coord, :y_coord, presence: true
	validates :price, :inclusion => { :in => 1..5 }
	validates :category, inclusion: {
		in: [
			"Bars & Nightlife",
			"Restaurants",
			"Coffee & Tea",
			"Arts & Entertainment",
			"Shopping",
			"Hotels & Travel",
			"Beauty & Spas",
			"Bakeries",
			"Food Carts",
			"Gyms",
			"Health & Medical",
			"Home Services"
		],
		message: "not a valid category"
	}
	
	has_many :reviews
	has_many :photos, through: :reviews

	def self.find_in_bounds(x, y)
		x = x.split ","
		y = y.split ","

		x_lower = x.first.to_f
		x_upper = x.last.to_f
		y_lower = y.first.to_f
		y_upper = y.last.to_f

		Business.where("x_coord > ? AND x_coord < ? AND y_coord < ? AND y_coord > ?", x_lower, x_upper, y_lower, y_upper)
	end

	def self.find_closest(point, businesses)
		x = point.split(",").first.to_f
		y = point.split(",").last.to_f

		current = nil
		businesses.each do |business|
			if current.nil?
				current = business
			else
				current_distance = current.calculate_distance(x, y)
				business_distance = business.calculate_distance(x, y)

				current = business if current_distance > business_distance
			end
		end

		current
	end

	def self.find_by_category(category)
		self.where(category: category)
	end

	def average_review
		total = 0
		self.reviews.each do |review|
			total += review.stars
		end

		(total.to_f / self.reviews.count).round(2)
	end

	def calculate_distance(x, y)
		x_diff = (self.x_coord - x).abs
		y_diff = (self.y_coord - y).abs

		Math.sqrt((x_diff ** 2) + (y_diff ** 2))
	end
end
