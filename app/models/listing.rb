# == Schema Information
#
# Table name: listings
#
#  id          :bigint           not null, primary key
#  host_id     :integer          not null
#  name        :string           not null
#  description :text             not null
#  cost        :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  lat         :float
#  lng         :float
#

class Listing < ApplicationRecord
  include PgSearch::Model

  # Associations
  belongs_to :host, class_name: 'User'
  has_many :reservations, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many_attached :images

  # Validations
  validates :title, presence: true, length: { minimum: 5, maximum: 100 }
  validates :description, presence: true
  validates :price_per_night, presence: true, numericality: { greater_than: 0 }
  validates :lat, :lng, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true

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

  # Full-text search
  pg_search_scope :search_by_location,
    against: {
      title: 'A',
      description: 'B',
      city: 'A',
      state: 'A',
      address: 'B'
    },
    using: {
      tsearch: { 
        prefix: true,
        dictionary: 'english',
        tsvector_column: 'searchable_content'
      },
      trigram: {
        word_similarity: true
      }
    }

  # Availability checking
  scope :available_between, ->(check_in, check_out) {
    where.not(
      id: Reservation
          .where('check_in <= ? AND check_out >= ?', check_out, check_in)
          .select(:listing_id)
    )
  }

  # Callbacks
  before_save :update_searchable_content

  def image_path
    return nil unless images.attached?
    Rails.application.routes.url_helpers.rails_blob_path(images.first, only_path: true)
  end

  def average_rating
    reviews.average(:rating)&.round(1)
  end

  private

  def update_searchable_content
    self.searchable_content = [
      title,
      description,
      city,
      state,
      address
    ].compact.join(' ')
  end
end
