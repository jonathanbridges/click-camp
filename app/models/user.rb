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
	# Authentication
	has_secure_password
	
	# Associations
	has_many :hosted_listings, class_name: 'Listing', foreign_key: :host_id
	has_many :bookings
	has_many :reviews
	has_one_attached :avatar
	
	# Validations
	validates :email, presence: true, 
					 uniqueness: true,
					 format: { with: URI::MailTo::EMAIL_REGEXP }
	validates :username, presence: true, 
						uniqueness: true,
						length: { minimum: 3, maximum: 30 }
	validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:password_digest] }
	
	# Scopes
	scope :hosts, -> { joins(:hosted_listings).distinct }
	
	def total_bookings
		hosted_listings.joins(:bookings).count
	end
	
	def average_host_rating
		hosted_listings.joins(:reviews).average(:rating)&.round(1)
	end
end
