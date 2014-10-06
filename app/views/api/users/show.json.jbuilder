json.(@user, :id, :username, :created_at, :about_me, :avatar_url)
json.current_user_id current_user.id

json.num_reviews @user.reviews.count

json.reviews @user.reviews do |review|
	json.extract! review, :id, :business_id, :content, :stars, :created_at, :updated_at, :go_again
	json.business review.business

	json.photos review.photos do |photo|
		json.extract! photo, :id, :created_at, :fp_url, :caption
	end
end

json.photos @user.photos do |photo|
	json.extract! photo, :id, :fp_url, :review_id, :caption, :created_at, :updated_at
end
