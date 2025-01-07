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

require 'test_helper'

class ReservationTest < ActiveSupport::TestCase
  setup do
    @host = User.create!(
      username: 'test_host',
      email: 'host@example.com',
      password: 'password123'
    )

    @camper = User.create!(
      username: 'test_camper',
      email: 'camper@example.com',
      password: 'password123'
    )

    @listing = Listing.create!(
      host: @host,
      title: 'Test Campsite',
      description: 'A beautiful test campsite',
      price_per_night: 50,
      address: '123 Test St',
      city: 'Test City',
      state: 'CA',
      lat: 37.7749,
      lng: -122.4194
    )

    @reservation = Reservation.new(
      camper: @camper,
      listing: @listing,
      check_in: Date.tomorrow,
      check_out: Date.tomorrow + 3.days,
      guest_count: 2
    )
  end

  test "should be valid with all required attributes" do
    assert @reservation.valid?
  end

  # Validation tests
  test "should not be valid without check-in date" do
    @reservation.check_in = nil
    assert_not @reservation.valid?
    assert_includes @reservation.errors[:check_in], "can't be blank"
  end

  test "should not be valid without check-out date" do
    @reservation.check_out = nil
    assert_not @reservation.valid?
    assert_includes @reservation.errors[:check_out], "can't be blank"
  end

  test "should not be valid without guest count" do
    @reservation.guest_count = nil
    assert_not @reservation.valid?
    assert_includes @reservation.errors[:guest_count], "can't be blank"
  end

  test "should not be valid with zero guest count" do
    @reservation.guest_count = 0
    assert_not @reservation.valid?
    assert_includes @reservation.errors[:guest_count], "must be greater than 0"
  end

  test "should not be valid with check-out before check-in" do
    @reservation.check_out = @reservation.check_in - 1.day
    assert_not @reservation.valid?
    assert_includes @reservation.errors[:check_out], "must be after check-in date"
  end

  test "should not be valid with overlapping reservation" do
    @reservation.save!
    
    overlapping_reservation = Reservation.new(
      camper: @camper,
      listing: @listing,
      check_in: @reservation.check_in + 1.day,
      check_out: @reservation.check_out + 1.day,
      guest_count: 2
    )
    
    assert_not overlapping_reservation.valid?
    assert_includes overlapping_reservation.errors[:base], "These dates conflict with an existing reservation"
  end

  test "should not be valid when booking own listing" do
    reservation = Reservation.new(
      camper: @host, # Host trying to book their own listing
      listing: @listing,
      check_in: Date.tomorrow,
      check_out: Date.tomorrow + 3.days,
      guest_count: 2
    )
    
    assert_not reservation.valid?
    assert_includes reservation.errors[:base], "You cannot make a reservation on your own listing"
  end

  # Association tests
  test "should belong to a camper" do
    assert_equal @camper, @reservation.camper
  end

  test "should belong to a listing" do
    assert_equal @listing, @reservation.listing
  end

  test "should have one review" do
    assert_respond_to @reservation, :review
  end

  # Method tests
  test "should calculate duration" do
    assert_equal 3, @reservation.duration
  end

  test "should calculate total price" do
    assert_equal 150, @reservation.total_price # 3 nights * $50
  end

  # Scope tests
  test "upcoming scope should return future reservations" do
    @reservation.save!
    past_reservation = Reservation.create!(
      camper: @camper,
      listing: @listing,
      check_in: 1.week.ago,
      check_out: 4.days.ago,
      guest_count: 2
    )

    upcoming = Reservation.upcoming
    assert_includes upcoming, @reservation
    assert_not_includes upcoming, past_reservation
  end

  test "past scope should return completed reservations" do
    @reservation.save!
    past_reservation = Reservation.create!(
      camper: @camper,
      listing: @listing,
      check_in: 1.week.ago,
      check_out: 4.days.ago,
      guest_count: 2
    )

    past = Reservation.past
    assert_includes past, past_reservation
    assert_not_includes past, @reservation
  end

  test "current scope should return ongoing reservations" do
    current_reservation = Reservation.create!(
      camper: @camper,
      listing: @listing,
      check_in: Date.current - 1.day,
      check_out: Date.current + 1.day,
      guest_count: 2
    )

    current = Reservation.current
    assert_includes current, current_reservation
    assert_not_includes current, @reservation
  end

  test "overlapping method should find conflicting reservations" do
    @reservation.save!
    
    # Test overlapping dates
    overlapping = Reservation.overlapping(
      @reservation.check_in + 1.day,
      @reservation.check_out + 1.day
    )
    assert_includes overlapping, @reservation

    # Test non-overlapping dates
    non_overlapping = Reservation.overlapping(
      @reservation.check_out + 1.day,
      @reservation.check_out + 4.days
    )
    assert_not_includes non_overlapping, @reservation
  end
end
