# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ['http://localhost:5173', 'http://127.0.0.1:5173']

    resource '/api/v1/*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      expose: ['Set-Cookie', 'access-token'],
      max_age: 600
  end
end 