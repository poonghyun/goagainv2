json.array! @businesses do |business|
	json.id business.id
	json.name business.name
  json.category business.category
  json.created_at business.created_at
  json.updated_at business.updated_at
  json.price business.price
  json.x_coord business.x_coord
  json.y_coord business.y_coord
  json.average_review business.average_review
  json.num_reviews business.reviews.count

	json.reviews business.reviews do |review|
		json.extract! review, :id, :business_id, :content, :stars, :created_at, :updated_at, :go_again
		json.user review.user
	end

	json.photos business.photos do |photo|
		json.extract! photo, :id, :fp_url, :review_id, :caption, :created_at, :updated_at
	end
end