# == Schema Information
#
# Table name: listings
#
#  id                 :bigint           not null, primary key
#  host_id            :integer          not null
#  title              :string           not null
#  description        :text             not null
#  price_per_night    :integer          not null
#  address            :string           not null
#  city               :string           not null
#  state              :string           not null
#  lat                :float
#  lng                :float
#  searchable_content :tsvector
#  active             :boolean          default(TRUE), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Listing < ApplicationRecord
  include PgSearch::Model

  # Active Storage
  has_many_attached :photos do |attachable|
    attachable.variant :thumb, resize_to_fill: [100, 100]
    attachable.variant :medium, resize_to_fill: [300, 300]
    attachable.variant :large, resize_to_fill: [800, 600]
  end

  has_many_attached :images

  # Associations
  belongs_to :host, class_name: 'User'
  has_many :reservations, dependent: :destroy
  has_many :reviews, dependent: :destroy

  # Validations
  validates :title, presence: true, length: { minimum: 5, maximum: 100 }
  validates :description, presence: true
  validates :price_per_night, presence: true, numericality: { greater_than: 0 }
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :lat, :lng, presence: true
  validates :active, inclusion: { in: [true, false] }

  # Scopes
  scope :active, -> { where(active: true) }
  scope :by_price_range, ->(min, max) { where(price_per_night: min..max) }
  
  # Scopes for geospatial queries
  scope :near_coordinates, ->(lat, lng, radius_in_miles = 50) {
    where(
      "ST_DWithin(
        ST_MakePoint(lng, lat)::geography,
        ST_MakePoint(?, ?)::geography,
        ? * 1609.34
      )",
      lng, lat, radius_in_miles
    )
  }

  def average_rating
    reviews.average(:rating) || 0
  end
end
