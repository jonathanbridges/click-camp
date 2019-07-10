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

require 'test_helper'

class ReservationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
