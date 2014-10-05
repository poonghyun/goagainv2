json.array! @photos do |photo|
	json.extract! photo, :id, :fp_url, :review_id, :created_at, :updated_at, :caption
	json.review photo.review
end