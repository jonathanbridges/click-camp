Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on S3
  config.active_storage.service = :amazon

  # Configure Active Storage URL generation
  config.active_storage.service_urls_expire_in = 1.week
  config.active_storage.resolve_model_to_route = :rails_storage_proxy

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Configure default URL options for development
  config.action_controller.default_url_options = { 
    host: 'localhost',
    port: 3000,
    protocol: 'http'
  }
  
  Rails.application.routes.default_url_options = { 
    host: 'localhost',
    port: 3000,
    protocol: 'http'
  }

  # Allow requests from the Vite dev server in development
  config.hosts << "localhost"

  # Use an evented file watcher to asynchronously detect changes in source code
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
end
