class Review < ActiveRecord::Base
	validates :content, :stars, :user_id, :business_id, presence: true
	validates :user_id, uniqueness: { scope: :business_id, message: "user can only review business once" }
	validates :go_again, :inclusion => {:in => [true, false]}
	validates :stars, :inclusion => { :in => 1..5 }

	belongs_to :user
	belongs_to :business
	has_many :photos

	def self.retrieve(page = nil)
		reviews = Review.all.order(updated_at: :desc)
		if page
			reviews.limit(5).offset(page.to_i * 5)
		else
			reviews.limit(5)
		end
	end
end