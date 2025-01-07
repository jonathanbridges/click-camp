# == Schema Information
#
# Table name: listings
#
#  id                 :bigint           not null, primary key
#  host_id            :integer          not null
#  title              :string           not null
#  description        :text             not null
#  price_per_night    :integer          not null
#  address            :string           not null
#  city               :string           not null
#  state              :string           not null
#  lat                :float
#  lng                :float
#  searchable_content :tsvector
#  active             :boolean          default(TRUE), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  def setup
    @user = users(:user_one)
    @listing = listings(:listing_one)
  end

  test "should be valid with all required attributes" do
    assert @listing.valid?
  end

  test "should require a host" do
    @listing.host = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Host must exist"
  end

  test "should require a title" do
    @listing.title = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Title can't be blank"
  end

  test "should require a description" do
    @listing.description = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Description can't be blank"
  end

  test "should require a price_per_night" do
    @listing.price_per_night = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Price per night can't be blank"
  end

  test "should require a positive price_per_night" do
    @listing.price_per_night = 0
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Price per night must be greater than 0"
  end

  test "should require an address" do
    @listing.address = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Address can't be blank"
  end

  test "should require a city" do
    @listing.city = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "City can't be blank"
  end

  test "should require a state" do
    @listing.state = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "State can't be blank"
  end

  test "should require latitude and longitude" do
    @listing.lat = nil
    @listing.lng = nil
    assert_not @listing.valid?
    assert_includes @listing.errors.full_messages, "Lat can't be blank"
    assert_includes @listing.errors.full_messages, "Lng can't be blank"
  end

  test "should calculate average rating" do
    assert_equal 5.0, @listing.average_rating
  end

  test "should find active listings" do
    active_listings = Listing.active
    assert_includes active_listings, @listing
  end

  test "should find listings by price range" do
    listings = Listing.by_price_range(50, 150)
    assert_includes listings, @listing
  end
end
