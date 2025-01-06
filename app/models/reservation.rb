# == Schema Information
#
# Table name: reservations
#
#  id          :bigint           not null, primary key
#  camper_id   :integer          not null
#  listing_id  :integer          not null
#  check_in    :date             not null
#  check_out   :date             not null
#  guest_count :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Reservation < ApplicationRecord
  # Associations
  belongs_to :camper, class_name: 'User'
  belongs_to :listing
  has_one :review, dependent: :destroy
  
  # Validations
  validates :check_in, :check_out, presence: true
  validates :guest_count, presence: true, numericality: { greater_than: 0 }
  validate :check_out_after_check_in
  validate :no_overlapping_reservations
  validate :not_own_listing
  
  # Scopes
  scope :upcoming, -> { where('check_in > ?', Date.current) }
  scope :past, -> { where('check_out < ?', Date.current) }
  scope :current, -> { where('check_in <= ? AND check_out >= ?', Date.current, Date.current) }
  
  def duration
    (check_out - check_in).to_i
  end

  def total_price
    duration * listing.price_per_night
  end

  def self.overlapping(start_date, end_date)
    where('(check_in <= ? AND check_out >= ?) OR (check_in <= ? AND check_out >= ?)',
          end_date, start_date, end_date, start_date)
  end
  
  private
  
  def check_out_after_check_in
    return unless check_in && check_out
    
    if check_out <= check_in
      errors.add(:check_out, "must be after check-in date")
    end
  end
  
  def no_overlapping_reservations
    return unless check_in && check_out
    
    overlapping_reservations = listing.reservations
                                    .where.not(id: id)
                                    .overlapping(check_in, check_out)
    
    if overlapping_reservations.exists?
      errors.add(:base, "These dates conflict with an existing reservation")
    end
  end

  def not_own_listing
    if camper_id == listing.host_id
      errors.add(:base, "You cannot make a reservation on your own listing")
    end
  end
end