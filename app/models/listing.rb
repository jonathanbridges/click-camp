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

  validates :host_id, :name, :description, :cost, :lat, :lng, presence: true

  belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

  has_many :reservations

  has_many :reviews

  has_many_attached :photos

end
