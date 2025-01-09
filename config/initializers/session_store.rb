# Be sure to restart your server when you modify this file.

if Rails.env.development?
  Rails.application.config.session_store :cookie_store,
    key: '_click_camp_session',
    domain: :all,
    same_site: :lax,
    secure: false,
    http_only: true,
    expire_after: 24.hours
else
  Rails.application.config.session_store :cookie_store,
    key: '_click_camp_session',
    secure: true,
    same_site: :strict,
    http_only: true,
    expire_after: 24.hours
end 