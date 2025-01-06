class UserBlueprint < Blueprinter::Base
  identifier :id
  fields :username, :email
  field :avatar_url do |user|
    user.avatar.attached? ? Rails.application.routes.url_helpers.url_for(user.avatar) : nil
  end
end 