ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  setup do
    Rails.application.config.action_dispatch.show_exceptions = :none
  end

  teardown do
    Rails.application.config.action_dispatch.show_exceptions = true
  end
end
