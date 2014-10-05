json.(@business, :id, :name, :category, :created_at, :updated_at, :price, :x_coord, :y_coord)
json.average_review @business.average_review
json.num_reviews @business.reviews.count

json.reviews @business.reviews do |review|
	json.extract! review, :id, :business_id, :content, :stars, :created_at, :updated_at, :go_again
	json.user review.user

	json.photos review.photos do |photo|
		json.extract! photo, :id, :created_at, :fp_url, :caption
	end
end

json.photos @business.photos do |photo|
	json.extract! photo, :id, :fp_url, :review_id, :caption, :created_at, :updated_at
end