Blueprinter.configure do |config|
  config.datetime_format = ->(datetime) { datetime.strftime("%Y-%m-%d") }
end 