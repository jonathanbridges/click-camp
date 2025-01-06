class ReservationBlueprint < Blueprinter::Base
  identifier :id
  
  # Basic fields
  fields :check_in, :check_out, :guest_count
  
  # Computed fields
  field :duration do |reservation|
    reservation.duration
  end
  
  field :total_price do |reservation|
    reservation.total_price
  end

  # Associations
  association :listing, blueprint: ListingBlueprint
  association :camper, blueprint: UserBlueprint, name: :user
  
  # Extended view with review
  view :extended do
    association :review, blueprint: ReviewBlueprint
    fields :created_at, :updated_at
  end
end 