# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :cookie_store,
  key: '_click_camp_session',
  same_site: :lax, # or :strict if you want to be more restrictive
  secure: Rails.env.production? # Only send cookies over HTTPS in production 