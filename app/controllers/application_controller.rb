class ApplicationController < ActionController::Base
  # Disable CSRF for API requests
  protect_from_forgery with: :null_session

  def frontend_index_html
    render file: 'public/index.html'
  end
end
