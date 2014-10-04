class User < ActiveRecord::Base
	validates :username, :password_digest, :session_token, presence: true
	validates :username, uniqueness: true
	validates :password, length: { minimum: 6, allow_nil: true }

	attr_reader :password

	after_initialize :ensure_session_token

	has_many :reviews
	has_many :photos, through: :reviews

	def password=(val)
		@password = val
		self.password_digest = BCrypt::Password.create(val)
	end

	def is_password?(val)
		BCrypt::Password.new(self.password_digest).is_password?(val)
	end

	def ensure_session_token
		self.session_token ||= User.generate_session_token
	end

	def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
	end

	def self.generate_session_token
		SecureRandom::urlsafe_base64(16)
	end

	def self.find_by_credentials(username, password)
		user = User.find_by_username(username)

		return nil if user.nil?

		user.is_password?(password) ? user : nil
	end

end
