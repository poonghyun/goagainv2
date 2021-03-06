if @closest
	json.closest do
		json.extract!(@closest, :id, :name, :category, :created_at, :updated_at, :price, :x_coord, :y_coord, :avatar_url)
		json.average_review @closest.average_review
		json.num_reviews @closest.reviews.count

		json.last_review @closest.reviews.last
		if @closest.reviews.last
			json.last_review_username @closest.reviews.last.user.username
		end

		json.photos @closest.photos do |photo|
			json.extract! photo, :id, :fp_url, :review_id, :caption, :created_at, :updated_at
		end
	end
end

json.others @businesses do |business|
	json.id business.id
	json.name business.name
	json.x_coord business.x_coord
	json.y_coord business.y_coord
end