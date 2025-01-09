class UserBlueprint < Blueprinter::Base
  identifier :id
  fields :username, :email
  
  field :avatar_url do |user|
    if user.avatar.attached?
      Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar)
    end
  end
end 