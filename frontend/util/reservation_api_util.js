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

export const fetchReservationsByUserId = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/reservations?userId=${userId}`
  })
}

export const deleteReservation = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/reservations/${id}`
  })
);

export const createReservation = reservation => (
  $.ajax({
    method: 'POST',
    url: 'api/reservations',
    data: { reservation }
  })
);
