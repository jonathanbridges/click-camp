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

export const deleteReservation = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/reservations/${id}`
  })
);

export const createReservation = reservation => {
  debugger
  return (
    $.ajax({
      method: 'POST',
      url: 'api/reservations',
      data: { reservation }
    })
  )
};
