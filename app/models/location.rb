# == Schema Information
#
# Table name: locations
#
#  id         :bigint           not null, primary key
#  lat        :float            not null
#  long       :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Location < ApplicationRecord

  validates :lat, :long, presence: true

  has_many :listings

end
