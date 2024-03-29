# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

	validates :username, :email, :password_digest, :session_token, presence: true
	validates :username, :email, uniqueness: true
	validates :password, length: { minimum: 6, allow_nil: true }
	
	attr_reader :password

	after_initialize :ensure_session_token

	has_many :listings
	
	has_many :reservations,
		foreign_key: :camper_id,
		class_name: :Reservation

	has_many :reviews,
		foreign_key: :reviewer_id,
		class_name: :Review

	has_one_attached :photo

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		user && user.is_password?(password) ? user : nil
	end

	def is_password?(password)
		BCrypt::Password.new(password_digest).is_password?(password)
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def ensure_session_token
		self.session_token ||= SecureRandom.urlsafe_base64
	end

	def reset_session_token!
		self.session_token = SecureRandom.urlsafe_base64
		self.save
		self.session_token
	end

end
