source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

# Core Rails gems
gem "rails", "~> 7.1.3"
gem "pg", "~> 1.5"
gem "pg_search"
gem "puma", "~> 6.4"

# API and JSON handling
gem "jbuilder", "~> 2.11"

# Authentication & Security
gem "bcrypt", "~> 3.1.7"
gem "rack-cors"

# File Storage
gem "aws-sdk-s3", require: false

# Performance & Caching
gem "bootsnap", require: false
gem "redis", "~> 5.0"

# Asset Pipeline
gem "sprockets-rails"
gem "propshaft"

# Blueprinter
gem 'blueprinter'

# Sidekiq
gem 'sidekiq'

group :development, :test do
  gem "debug"
  gem "rspec-rails"
  gem "factory_bot_rails"
  gem "faker"
  gem "pry-rails"
end

group :development do
  gem "web-console"
  gem "error_highlight"
  gem "annotate"
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "brakeman", require: false
  gem "listen", "~> 3.8"
end
