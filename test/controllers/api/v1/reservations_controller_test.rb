require 'test_helper'

class Api::V1::ReservationsControllerTest < ActionDispatch::IntegrationTest
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

    @reservation = Reservation.create!(
      camper: @camper,
      listing: @listing,
      check_in: Date.tomorrow,
      check_out: Date.tomorrow + 3.days,
      guest_count: 2
    )

    # Log in as camper
    post api_v1_session_url, params: {
      email: 'camper@example.com',
      password: 'password123'
    }, as: :json
  end

  test "should get index" do
    get api_v1_reservations_url, as: :json
    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_includes response_body.map { |r| r['id'] }, @reservation.id
  end

  test "should show reservation" do
    get api_v1_reservation_url(@reservation), as: :json
    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_equal @reservation.id, response_body['id']
    # Extended view should include listing details
    assert_not_nil response_body['listing']
  end

  test "should create reservation" do
    assert_difference('Reservation.count') do
      post api_v1_reservations_url, params: {
        reservation: {
          listing_id: @listing.id,
          check_in: Date.today + 10.days,
          check_out: Date.today + 12.days,
          guest_count: 3
        }
      }, as: :json
    end

    assert_response :created
    response_body = JSON.parse(response.body)
    assert_equal 3, response_body['guest_count']
    assert_equal @camper.id, response_body['camper_id']
    assert_equal @listing.id, response_body['listing_id']
  end

  test "should update reservation" do
    patch api_v1_reservation_url(@reservation), params: {
      reservation: {
        guest_count: 4
      }
    }, as: :json

    assert_response :success
    @reservation.reload
    assert_equal 4, @reservation.guest_count
  end

  test "should destroy reservation" do
    assert_difference('Reservation.count', -1) do
      delete api_v1_reservation_url(@reservation), as: :json
    end

    assert_response :no_content
  end

  test "should not access another user's reservation" do
    other_camper = User.create!(
      username: 'other_camper',
      email: 'other@example.com',
      password: 'password123'
    )

    other_reservation = Reservation.create!(
      camper: other_camper,
      listing: @listing,
      check_in: Date.tomorrow + 5.days,
      check_out: Date.tomorrow + 7.days,
      guest_count: 2
    )

    get api_v1_reservation_url(other_reservation), as: :json
    assert_response :not_found
  end

  test "should not create overlapping reservation" do
    assert_no_difference('Reservation.count') do
      post api_v1_reservations_url, params: {
        reservation: {
          listing_id: @listing.id,
          check_in: @reservation.check_in,
          check_out: @reservation.check_out,
          guest_count: 2
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].present?
  end

  test "should require authentication" do
    delete api_v1_session_url # log out
    
    get api_v1_reservations_url, as: :json
    assert_response :unauthorized
  end
end 