class Photo < ActiveRecord::Base
	belongs_to :review

	validates :fp_url, :review_id, presence: true
end
