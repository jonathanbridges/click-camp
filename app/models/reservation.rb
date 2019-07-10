# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  camper_id  :integer          not null
#  listing_id :integer          not null
#  check_in   :date             not null
#  check_out  :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Reservation < ApplicationRecord

  validates :camper_id, :listing_id, :check_in, :check_out, presence: true

  belongs_to :user
  belongs_to :listing

  def overlapping_requests
    
  end

  def overlapping_approved_requests

  end

  def does_not_overlap_approved_request
    
  end

end
