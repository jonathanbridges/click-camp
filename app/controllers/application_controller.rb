class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  
  # Disable CSRF for API requests
  protect_from_forgery with: :null_session
end
