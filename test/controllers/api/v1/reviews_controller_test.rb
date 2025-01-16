require 'test_helper'

class Api::V1::ReviewsControllerTest < ActionDispatch::IntegrationTest
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
      check_in: 1.week.ago,
      check_out: 4.days.ago,
      guest_count: 2
    )

    @review = Review.create!(
      reviewer: @reviewer,
      listing: @listing,
      reservation: @reservation,
      content: 'Great campsite!',
      rating: 5
    )

    # Log in as reviewer
    post api_v1_session_url, params: {
      email: 'reviewer@example.com',
      password: 'password123'
    }, as: :json
  end

  test "should get index" do
    get api_v1_listing_reviews_url(@listing), as: :json
    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_includes response_body.map { |r| r['content'] }, @review.content
  end

  test "should create review" do
    new_reservation = Reservation.create!(
      camper: @reviewer,
      listing: @listing,
      check_in: 2.weeks.ago,
      check_out: 11.days.ago,
      guest_count: 1
    )

    assert_difference('Review.count') do
      post api_v1_listing_reviews_url(@listing), params: {
        review: {
          reservation_id: new_reservation.id,
          content: 'Another great stay!',
          rating: 4
        }
      }, as: :json
    end

    assert_response :created
    response_body = JSON.parse(response.body)
    assert_equal 'Another great stay!', response_body['content']
    assert_equal @listing.id, response_body['listing_id']
  end

  test "should update review" do
    patch api_v1_review_url(@review), params: {
      review: {
        content: 'Updated review content',
        rating: 4
      }
    }, as: :json

    assert_response :success
    @review.reload
    assert_equal 'Updated review content', @review.content
    assert_equal 4, @review.rating
  end

  test "should not update another user's review" do
    other_reviewer = User.create!(
      username: 'other_reviewer',
      email: 'other@example.com',
      password: 'password123'
    )

    other_reservation = Reservation.create!(
      camper: other_reviewer,
      listing: @listing,
      check_in: 3.weeks.ago,
      check_out: 2.weeks.ago,
      guest_count: 2
    )

    other_review = Review.create!(
      reviewer: other_reviewer,
      listing: @listing,
      reservation: other_reservation,
      content: 'Other review',
      rating: 4
    )

    patch api_v1_review_url(other_review), params: {
      review: {
        content: 'Trying to update someone else\'s review',
        rating: 1
      }
    }, as: :json

    assert_response :not_found
    other_review.reload
    assert_equal 'Other review', other_review.content
    assert_equal 4, other_review.rating
  end

  test "should destroy review" do
    assert_difference('Review.count', -1) do
      delete api_v1_review_url(@review), as: :json
    end

    assert_response :no_content
  end

  test "should not destroy another user's review" do
    other_reviewer = User.create!(
      username: 'other_reviewer',
      email: 'other@example.com',
      password: 'password123'
    )

    other_reservation = Reservation.create!(
      camper: other_reviewer,
      listing: @listing,
      check_in: 3.weeks.ago,
      check_out: 2.weeks.ago,
      guest_count: 2
    )

    other_review = Review.create!(
      reviewer: other_reviewer,
      listing: @listing,
      reservation: other_reservation,
      content: 'Other review',
      rating: 4
    )

    assert_no_difference('Review.count') do
      delete api_v1_review_url(other_review), as: :json
    end

    assert_response :not_found
  end

  test "should not create review without completed reservation" do
    future_reservation = Reservation.create!(
      camper: @reviewer,
      listing: @listing,
      check_in: Date.tomorrow,
      check_out: Date.tomorrow + 3.days,
      guest_count: 2
    )

    assert_no_difference('Review.count') do
      post api_v1_listing_reviews_url(@listing), params: {
        review: {
          reservation_id: future_reservation.id,
          content: 'Cannot review yet!',
          rating: 5
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].present?
  end

  test "should not create review with invalid rating" do
    new_reservation = Reservation.create!(
      camper: @reviewer,
      listing: @listing,
      check_in: 2.weeks.ago,
      check_out: 11.days.ago,
      guest_count: 1
    )

    # Test rating too low
    assert_no_difference('Review.count') do
      post api_v1_listing_reviews_url(@listing), params: {
        review: {
          reservation_id: new_reservation.id,
          content: 'Invalid rating',
          rating: 0
        }
      }, as: :json
    end
    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].key?('rating')

    # Test rating too high
    assert_no_difference('Review.count') do
      post api_v1_listing_reviews_url(@listing), params: {
        review: {
          reservation_id: new_reservation.id,
          content: 'Invalid rating',
          rating: 6
        }
      }, as: :json
    end
    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].key?('rating')
  end

  test "should require authentication" do
    delete api_v1_session_url # log out
    
    get api_v1_listing_reviews_url(@listing), as: :json
    assert_response :unauthorized
  end

  test "should not update review with invalid data" do
    patch api_v1_review_url(@review), params: {
      review: {
        content: 'too short', # Less than 10 characters
        rating: 6 # Invalid rating
      }
    }, as: :json

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].present?
    assert response_body['errors'].key?('content')
    assert response_body['errors'].key?('rating')

    @review.reload
    assert_not_equal 'too short', @review.content
  end

  test "should require authentication for update" do
    delete api_v1_session_url # log out
    
    patch api_v1_review_url(@review), params: {
      review: {
        content: 'Updated content that should not be saved',
        rating: 3
      }
    }, as: :json
    
    assert_response :unauthorized
  end

  test "should require authentication for destroy" do
    delete api_v1_session_url # log out
    
    delete api_v1_review_url(@review), as: :json
    assert_response :unauthorized
    assert Review.exists?(@review.id)
  end
end 