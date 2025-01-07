require 'test_helper'

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(
      username: 'test_user',
      email: 'user@example.com',
      password: 'password123'
    )
  end

  test "should create session with valid credentials" do
    post api_v1_session_url, params: {
      email: 'user@example.com',
      password: 'password123'
    }, as: :json

    assert_response :success
    response_body = JSON.parse(response.body)
    assert_equal @user.id, response_body['id']
    assert_equal @user.username, response_body['username']
  end

  test "should not create session with invalid password" do
    post api_v1_session_url, params: {
      email: 'user@example.com',
      password: 'wrongpassword'
    }, as: :json

    assert_response :unauthorized
    response_body = JSON.parse(response.body)
    assert_equal 'Invalid email or password', response_body['error']
  end

  test "should not create session with non-existent email" do
    post api_v1_session_url, params: {
      email: 'nonexistent@example.com',
      password: 'password123'
    }, as: :json

    assert_response :unauthorized
    response_body = JSON.parse(response.body)
    assert_equal 'Invalid email or password', response_body['error']
  end

  test "should destroy session" do
    # First login
    post api_v1_session_url, params: {
      email: 'user@example.com',
      password: 'password123'
    }, as: :json
    assert_response :success

    # Then logout
    delete api_v1_session_url
    assert_response :no_content

    # Try to access protected resource
    get api_v1_reservations_url, as: :json
    assert_response :unauthorized
  end

  test "should return unauthorized when destroying session while not logged in" do
    delete api_v1_session_url
    assert_response :unauthorized
    response_body = JSON.parse(response.body)
    assert_equal 'You need to sign in before continuing', response_body['error']
  end
end 