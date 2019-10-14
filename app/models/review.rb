# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  reviewer_id :integer          not null
#  listing_id  :integer          not null
#  text        :text             not null
#  recommends  :boolean          default(TRUE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Review < ApplicationRecord

  validates :reviewer_id, :listing_id, :text, presence: true
  validates_length_of :text, :within => 6..255, :too_long => "Maximum 255 Characters", :too_short => "Minimum 8 Characters"

  belongs_to :reviewer,
    foreign_key: :reviewer_id,
    class_name: :User

  belongs_to :listing

  def self.get_number_ratings(listing_id)
    self.where("listing_id = ?", listing_id).count
  end

  def self.get_rating(listing_id)
    reviews = self.where("listing_id = ?", listing_id)
    likes = reviews.where(recommends: true).count
    rating = (likes / reviews.length.to_f * 100).to_f.round
  end

end
