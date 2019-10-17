@reservations.each do |reservation|
  json.set! reservation.id do 
    json.extract! reservation, :id, :check_in, :check_out, :camper_id, :listing_id
  end
end