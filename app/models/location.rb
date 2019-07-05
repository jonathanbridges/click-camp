# == Schema Information
#
# Table name: locations
#
#  id         :bigint           not null, primary key
#  listing_id :integer          not null
#  lat        :float            not null
#  long       :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Location < ApplicationRecord

  validates :listing_id, :lat, :long, presence: true

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

end
