class ReviewBlueprint < Blueprinter::Base
  identifier :id
  fields :content, :rating, :created_at
  association :user, blueprint: UserBlueprint
end 