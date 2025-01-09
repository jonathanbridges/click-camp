require 'test_helper'

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(
      username: 'existing_user',
      email: 'existing@example.com',
      password: 'password123'
    )

    # Log in as the existing user for tests that require authentication
    post api_v1_session_url, params: {
      email: 'existing@example.com',
      password: 'password123'
    }, as: :json
  end

  test "should create user" do
    assert_difference('User.count') do
      post api_v1_users_url, params: {
        user: {
          username: 'new_user',
          email: 'new@example.com',
          password: 'password123'
        }
      }, as: :json
    end

    assert_response :created
    response_body = JSON.parse(response.body)
    assert_equal 'new_user', response_body['username']
    assert_equal 'new@example.com', response_body['email']
    assert_nil response_body['password_digest'] # Ensure password is not exposed
  end

  test "should not create user with duplicate email" do
    assert_no_difference('User.count') do
      post api_v1_users_url, params: {
        user: {
          username: 'another_user',
          email: 'existing@example.com', # Using existing email
          password: 'password123'
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].key?('email')
  end

  test "should not create user with invalid email" do
    assert_no_difference('User.count') do
      post api_v1_users_url, params: {
        user: {
          username: 'invalid_email_user',
          email: 'not_an_email',
          password: 'password123'
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert response_body['errors'].key?('email')
  end

  test "should show current user" do
    get api_v1_user_url(@user), as: :json
    assert_response :success
    
    response_body = JSON.parse(response.body)
    assert_equal @user.username, response_body['username']
    assert_equal @user.email, response_body['email']
    assert_nil response_body['password_digest']
  end

  test "should update current user" do
    patch api_v1_user_url(@user), params: {
      user: {
        username: 'updated_username'
      }
    }, as: :json

    assert_response :success
    @user.reload
    assert_equal 'updated_username', @user.username
  end

  test "should not update another user" do
    other_user = User.create!(
      username: 'other_user',
      email: 'other@example.com',
      password: 'password123'
    )

    patch api_v1_user_url(other_user), params: {
      user: {
        username: 'hacked_username'
      }
    }, as: :json

    assert_response :unprocessable_entity
    other_user.reload
    assert_not_equal 'hacked_username', other_user.username
  end

  test "should require authentication for protected actions" do
    delete api_v1_session_url # log out
    
    # Try to view user details
    get api_v1_user_url(@user), as: :json
    assert_response :unauthorized

    # Try to update user
    patch api_v1_user_url(@user), params: {
      user: { username: 'hacker' }
    }, as: :json
    assert_response :unauthorized
  end

  test "should get me when authenticated" do
    # Try to access /me endpoint
    get me_api_v1_users_url, as: :json
    assert_response :success
    
    # Verify the response contains the correct user
    response_user = JSON.parse(response.body)
    assert_equal @user.id, response_user['id']
    assert_equal @user.email, response_user['email']
  end

  test "should not get me when not authenticated" do
    # Make sure we're logged out
    delete api_v1_session_url
    
    get me_api_v1_users_url, as: :json
    assert_response :unauthorized
  end
end 