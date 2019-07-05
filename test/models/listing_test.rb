# == Schema Information
#
# Table name: listings
#
#  id          :bigint           not null, primary key
#  host_id     :integer          not null
#  location_id :integer          not null
#  name        :string           not null
#  description :text             not null
#  cost        :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
