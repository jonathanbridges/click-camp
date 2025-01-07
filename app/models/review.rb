# == Schema Information
#
# Table name: reviews
#
#  id             :bigint           not null, primary key
#  reviewer_id    :integer          not null
#  listing_id     :integer          not null
#  reservation_id :integer          not null
#  content        :text             not null
#  rating         :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Review < ApplicationRecord
  # Associations
  belongs_to :reviewer, class_name: 'User'
  belongs_to :listing
  belongs_to :reservation
  
  # Validations
  validates :rating, presence: true, 
                    numericality: { 
                      only_integer: true,
                      greater_than_or_equal_to: 1,
                      less_than_or_equal_to: 5
                    }
  validates :content, presence: true, length: { minimum: 10, maximum: 1000 }
  validates :reservation_id, uniqueness: { message: "can only have one review" }
  validate :reservation_completed
  
  # Scopes
  scope :recent, -> { order(created_at: :desc, id: :desc) }
  scope :by_rating, ->(rating) { where(rating: rating) }
  
  private
  
  def reservation_completed
    return unless reservation
    
    unless reservation.check_out < Date.current
      errors.add(:reservation, "must be completed before leaving a review")
    end
  end
end
