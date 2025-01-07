class ReservationNotificationJob < ApplicationJob
  queue_as :default

  def perform(reservation)
    # TODO: Implement actual notification logic
    # For now, this is just a placeholder
    Rails.logger.info "Reservation notification for reservation #{reservation.id}"
    Rails.logger.info "Host: #{reservation.listing.host.email}"
    Rails.logger.info "Camper: #{reservation.camper.email}"
    Rails.logger.info "Listing: #{reservation.listing.title}"
    Rails.logger.info "Check-in: #{reservation.check_in}"
    Rails.logger.info "Check-out: #{reservation.check_out}"
  end
end 