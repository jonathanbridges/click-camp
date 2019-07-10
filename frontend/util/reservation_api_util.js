export const fetchReservations = data => (
  $.ajax({
    method: 'GET',
    url: 'api/reservations',
    data
  })
);

export const fetchReservation = id => (
  $.ajax({
    method: 'GET',
    url: `api/reservations/${id}`,
  })
);