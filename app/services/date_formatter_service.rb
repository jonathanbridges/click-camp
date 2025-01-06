class DateFormatterService
  def self.format_reservation_dates(reservation)
    {
      check_in: reservation.check_in.strftime("%B %d, %Y"),
      check_out: reservation.check_out.strftime("%B %d, %Y")
    }
  end
end 