require 'test_helper'

class Api::V1::ListingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @host = User.create!(
      username: 'test_host',
      email: 'host@example.com',
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

    # Log in as host for tests that require authentication
    post api_v1_session_url, params: {
      email: 'host@example.com',
      password: 'password123'
    }, as: :json
  end

  test "should get index without authentication" do
    delete api_v1_session_url # log out first
    get api_v1_listings_url, as: :json
    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_includes response_body.map { |l| l['title'] }, @listing.title
  end

  test "should show listing without authentication" do
    delete api_v1_session_url # log out first
    get api_v1_listing_url(@listing), as: :json
    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_equal @listing.title, response_body['title']
    # Extended view should include these fields
    assert_not_nil response_body['description']
    assert_not_nil response_body['price_per_night']
  end

  test "should create listing" do
    assert_difference('Listing.count') do
      post api_v1_listings_url, params: {
        listing: {
          title: 'New Campsite',
          description: 'A beautiful new test campsite with amazing views and great amenities.',
          price_per_night: 75,
          max_guests: 6,
          address: '456 Test St',
          city: 'Test City',
          state: 'CA',
          lat: 37.7749,
          lng: -122.4194
        }
      }, as: :json
    end

    assert_response :created
    response_body = JSON.parse(response.body)
    assert_equal 'New Campsite', response_body['title']
    assert_equal @host.id, response_body['host_id']
  end

  test "should not create listing without authentication" do
    delete api_v1_session_url # log out

    assert_no_difference('Listing.count') do
      post api_v1_listings_url, params: {
        listing: {
          title: 'Unauthorized Campsite',
          description: 'Should not be created',
          price_per_night: 50,
          max_guests: 4,
          address: '789 Test St',
          city: 'Test City',
          state: 'CA',
          lat: 37.7749,
          lng: -122.4194
        }
      }, as: :json
    end

    assert_response :unauthorized
  end

  test "should not create listing with invalid data" do
    assert_no_difference('Listing.count') do
      post api_v1_listings_url, params: {
        listing: {
          title: '', # Empty title should be invalid
          description: 'Invalid listing',
          price_per_night: -50, # Negative price should be invalid
          max_guests: 0, # Invalid guest count
          address: '789 Test St',
          city: 'Test City',
          state: 'CA',
          lat: 37.7749,
          lng: -122.4194
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].present?
  end
end 