# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = User.new(
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    )
  end

  test "should be valid with all required attributes" do
    assert @user.valid?
  end

  # Validation tests
  test "should not be valid without a username" do
    @user.username = nil
    assert_not @user.valid?
    assert_includes @user.errors[:username], "can't be blank"
  end

  test "should not be valid with a short username" do
    @user.username = "ab"
    assert_not @user.valid?
    assert_includes @user.errors[:username], "is too short (minimum is 3 characters)"
  end

  test "should not be valid with a long username" do
    @user.username = "a" * 31
    assert_not @user.valid?
    assert_includes @user.errors[:username], "is too long (maximum is 30 characters)"
  end

  test "should not be valid without an email" do
    @user.email = nil
    assert_not @user.valid?
    assert_includes @user.errors[:email], "can't be blank"
  end

  test "should not be valid with invalid email format" do
    @user.email = "invalid_email"
    assert_not @user.valid?
    assert_includes @user.errors[:email], "is invalid"
  end

  test "should not be valid with duplicate email" do
    @user.save!
    duplicate_user = User.new(
      username: 'different_user',
      email: 'test@example.com',
      password: 'password123'
    )
    assert_not duplicate_user.valid?
    assert_includes duplicate_user.errors[:email], "has already been taken"
  end

  test "should not be valid with duplicate username" do
    @user.save!
    duplicate_user = User.new(
      username: 'testuser',
      email: 'different@example.com',
      password: 'password123'
    )
    assert_not duplicate_user.valid?
    assert_includes duplicate_user.errors[:username], "has already been taken"
  end

  test "should not be valid with short password" do
    @user.password = "short"
    assert_not @user.valid?
    assert_includes @user.errors[:password], "is too short (minimum is 6 characters)"
  end

  # Authentication tests
  test "should authenticate with correct password" do
    @user.save!
    assert @user.authenticate('password123')
  end

  test "should not authenticate with incorrect password" do
    @user.save!
    assert_not @user.authenticate('wrongpassword')
  end

  # Session token tests
  test "should generate session token before validation" do
    @user.valid?
    assert_not_nil @user.session_token
  end

  test "should have unique session token" do
    @user.save!
    another_user = User.create!(
      username: 'another_user',
      email: 'another@example.com',
      password: 'password123'
    )
    assert_not_equal @user.session_token, another_user.session_token
  end

  # Association tests
  test "should have many hosted listings" do
    assert_respond_to @user, :hosted_listings
    assert_kind_of ActiveRecord::Associations::CollectionProxy, @user.hosted_listings
  end

  test "should have many reservations" do
    assert_respond_to @user, :reservations
    assert_kind_of ActiveRecord::Associations::CollectionProxy, @user.reservations
  end

  test "should have many reviews" do
    assert_respond_to @user, :reviews
    assert_kind_of ActiveRecord::Associations::CollectionProxy, @user.reviews
  end

  # Method tests
  test "should calculate total hosted reservations" do
    @user.save!
    listing = Listing.create!(
      host: @user,
      title: 'Test Campsite',
      description: 'A beautiful test campsite',
      price_per_night: 50,
      address: '123 Test St',
      city: 'Test City',
      state: 'CA',
      lat: 37.7749,
      lng: -122.4194
    )

    camper = User.create!(
      username: 'test_camper',
      email: 'camper@example.com',
      password: 'password123'
    )

    Reservation.create!(
      camper: camper,
      listing: listing,
      check_in: Date.tomorrow,
      check_out: Date.tomorrow + 3.days,
      guest_count: 2
    )

    assert_equal 1, @user.total_hosted_reservations
  end

  test "should calculate average host rating" do
    @user.save!
    listing = Listing.create!(
      host: @user,
      title: 'Test Campsite',
      description: 'A beautiful test campsite',
      price_per_night: 50,
      address: '123 Test St',
      city: 'Test City',
      state: 'CA',
      lat: 37.7749,
      lng: -122.4194
    )

    camper = User.create!(
      username: 'test_camper',
      email: 'camper@example.com',
      password: 'password123'
    )

    reservation = Reservation.create!(
      camper: camper,
      listing: listing,
      check_in: 1.week.ago,
      check_out: 4.days.ago,
      guest_count: 2
    )

    Review.create!(
      reviewer: camper,
      listing: listing,
      reservation: reservation,
      rating: 4,
      content: "Great place!"
    )

    assert_equal 4.0, @user.average_host_rating
  end

  # Scope tests
  test "hosts scope should return users with listings" do
    @user.save!
    non_host = User.create!(
      username: 'non_host',
      email: 'non_host@example.com',
      password: 'password123'
    )

    Listing.create!(
      host: @user,
      title: 'Test Campsite',
      description: 'A beautiful test campsite',
      price_per_night: 50,
      address: '123 Test St',
      city: 'Test City',
      state: 'CA',
      lat: 37.7749,
      lng: -122.4194
    )

    hosts = User.hosts
    assert_includes hosts, @user
    assert_not_includes hosts, non_host
  end
end
