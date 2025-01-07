class ReviewBlueprint < Blueprinter::Base
  identifier :id
  fields :content, :rating, :created_at, :listing_id
  association :reviewer, blueprint: UserBlueprint
end 