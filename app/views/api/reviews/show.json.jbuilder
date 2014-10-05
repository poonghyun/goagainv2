json.(@review, :id, :content, :stars, :created_at, :updated_at, :go_again)
json.user @review.user
json.business @review.business

json.photos @review.photos do |photo|
	json.extract! photo, :id, :created_at, :updated_at, :fp_url, :caption
end