class UserBlueprint < Blueprinter::Base
  identifier :id
  fields :username, :email
  
  field :avatar_url do |user|
    if user.avatar.attached?
      begin
        Rails.application.routes.url_helpers.rails_blob_url(user.avatar, only_path: true)
      rescue => e
        Rails.logger.error("Error generating URL for avatar: #{e.message}")
        nil
      end
    end
  end
end 