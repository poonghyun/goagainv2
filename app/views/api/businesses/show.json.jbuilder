json.(@business, :id, :name, :category, :created_at, :updated_at, :price, :x_coord, :y_coord, :avatar_url)
json.average_review @business.average_review
json.num_reviews @business.reviews.count

json.current_user_reviewed @business.reviews.map{ |review| review.user.id }.include?(current_user.id) ? true : false
json.current_user_review @business.reviews.where(user_id: current_user.id).first

json.reviews @business.reviews.reverse do |review|
	json.extract! review, :id, :business_id, :content, :stars, :created_at, :updated_at, :go_again
	json.user review.user
	json.current_user_id current_user.id

	json.photos review.photos do |photo|
		json.extract! photo, :id, :created_at, :fp_url, :caption
	end
end

json.photos @business.photos do |photo|
	json.extract! photo, :id, :fp_url, :review_id, :caption, :created_at, :updated_at
end