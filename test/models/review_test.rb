# == Schema Information
#
# Table name: reviews
#
#  id             :bigint           not null, primary key
#  reviewer_id    :integer          not null
#  listing_id     :integer          not null
#  reservation_id :integer          not null
#  content        :text             not null
#  rating         :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  setup do
    @host = User.create!(
      username: 'test_host',
      email: 'host@example.com',
      password: 'password123'
    )

    @reviewer = User.create!(
      username: 'test_reviewer',
      email: 'reviewer@example.com',
      password: 'password123'
    )

    @listing = Listing.create!(
      host: @host,
      title: 'Test Campsite',
      description: 'A beautiful test campsite',
      price_per_night: 50,
      max_guests: 4,
      address: '123 Test St',
      city: 'Test City',
      state: 'CA',
      lat: 37.7749,
      lng: -122.4194
    )

    @reservation = Reservation.create!(
      camper: @reviewer,
      listing: @listing,
      check_in: 2.months.ago,
      check_out: 7.weeks.ago,
      guest_count: 2
    )

    @review = Review.new(
      reviewer: @reviewer,
      listing: @listing,
      reservation: @reservation,
      rating: 4,
      content: "Great campsite with beautiful views!"
    )
  end

  test "should be valid with all required attributes" do
    assert @review.valid?
  end

  # Validation tests
  test "should not be valid without rating" do
    @review.rating = nil
    assert_not @review.valid?
    assert_includes @review.errors[:rating], "can't be blank"
  end

  test "should not be valid with rating less than 1" do
    @review.rating = 0
    assert_not @review.valid?
    assert_includes @review.errors[:rating], "must be greater than or equal to 1"
  end

  test "should not be valid with rating greater than 5" do
    @review.rating = 6
    assert_not @review.valid?
    assert_includes @review.errors[:rating], "must be less than or equal to 5"
  end

  test "should not be valid with non-integer rating" do
    @review.rating = 4.5
    assert_not @review.valid?
    assert_includes @review.errors[:rating], "must be an integer"
  end

  test "should not be valid without content" do
    @review.content = nil
    assert_not @review.valid?
    assert_includes @review.errors[:content], "can't be blank"
  end

  test "should not be valid with short content" do
    @review.content = "Too short"
    assert_not @review.valid?
    assert_includes @review.errors[:content], "is too short (minimum is 10 characters)"
  end

  test "should not be valid with very long content" do
    @review.content = "a" * 1001
    assert_not @review.valid?
    assert_includes @review.errors[:content], "is too long (maximum is 1000 characters)"
  end

  test "should not be valid for incomplete reservation" do
    future_reservation = Reservation.create!(
      camper: @reviewer,
      listing: @listing,
      check_in: Date.tomorrow,
      check_out: Date.tomorrow + 3.days,
      guest_count: 2
    )

    review = Review.new(
      reviewer: @reviewer,
      listing: @listing,
      reservation: future_reservation,
      rating: 4,
      content: "Can't review before staying!"
    )

    assert_not review.valid?
    assert_includes review.errors[:reservation], "must be completed before leaving a review"
  end

  test "should not allow multiple reviews for same reservation" do
    @review.save!
    duplicate_review = Review.new(
      reviewer: @reviewer,
      listing: @listing,
      reservation: @reservation,
      rating: 5,
      content: "Trying to review again!"
    )

    assert_not duplicate_review.valid?
    assert_includes duplicate_review.errors[:reservation_id], "can only have one review"
  end

  # Association tests
  test "should belong to a reviewer" do
    assert_equal @reviewer, @review.reviewer
  end

  test "should belong to a listing" do
    assert_equal @listing, @review.listing
  end

  test "should belong to a reservation" do
    assert_equal @reservation, @review.reservation
  end

  # Scope tests
  test "recent scope should order by creation date" do
    # Clear any existing reviews
    Review.delete_all
    
    first_review = @review
    first_review.created_at = 2.days.ago
    first_review.save!
    
    another_review = Review.create!(
      reviewer: @reviewer,
      listing: @listing,
      reservation: Reservation.create!(
        camper: @reviewer,
        listing: @listing,
        check_in: 4.months.ago,
        check_out: 15.weeks.ago,
        guest_count: 2
      ),
      rating: 5,
      content: "Another great stay!"
    )
    another_review.update_column(:created_at, 1.day.ago)

    recent_reviews = Review.recent
    assert_equal [another_review, first_review], recent_reviews.to_a
  end

  test "by_rating scope should filter by rating" do
    @review.save!
    
    five_star_review = Review.create!(
      reviewer: @reviewer,
      listing: @listing,
      reservation: Reservation.create!(
        camper: @reviewer,
        listing: @listing,
        check_in: 6.months.ago,
        check_out: 23.weeks.ago,
        guest_count: 2
      ),
      rating: 5,
      content: "Perfect stay!"
    )

    four_star_reviews = Review.by_rating(4)
    five_star_reviews = Review.by_rating(5)

    assert_includes four_star_reviews, @review
    assert_not_includes four_star_reviews, five_star_review
    assert_includes five_star_reviews, five_star_review
    assert_not_includes five_star_reviews, @review
  end
end
