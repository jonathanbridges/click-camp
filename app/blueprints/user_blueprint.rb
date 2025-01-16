class UserBlueprint < Blueprinter::Base
  identifier :id
  fields :username, :email, :created_at
  
  field :avatar_url do |user|
    if user.avatar.attached?
      Rails.application.routes.url_helpers.url_for(user.avatar)
    end
  end
end 