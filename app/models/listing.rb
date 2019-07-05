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

class Listing < ApplicationRecord

  validates :host_id, :location_id, :name, :description, :cost, presence: true

  belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

  has_many :locations,
    foreign_key: :location_id,
    class_name: :Location

end
