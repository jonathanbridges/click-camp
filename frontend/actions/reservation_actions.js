import * as APIUtil from '../util/reservation_api_util';

export const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';
export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
export const REMOVE_RESERVATION = 'REMOVE_RESERVATION';

// Action creators

export const receiveReservations = reservations => ({
  type: RECEIVE_RESERVATIONS,
  reservations
});

export const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation 
});

export const removeReservation = reservation => ({
  type: REMOVE_RESERVATION,
  reservationId: reservation.id
});

export const fetchReservations = () => dispatch => (
  APIUtil.fetchReservations().then(reservations => (
    dispatch(receiveReservations(reservations))
  ))
);

// Thunk action creators

export const fetchReservation = id => dispatch => (
  APIUtil.fetchReservation(id).then(payload => (
    dispatch(receiveReservation(payload))
  ))
);

export const createReservation = (reservation) => dispatch => (
  APIUtil.createReservation(reservation).then(reservation => (
    dispatch(receiveReservation(reservation))
  ))
);

export const deleteReservation = (reservation) => dispatch => (
  APIUtil.deleteReservation(reservation).then(reservation => (
    dispatch(removeReservation(reservation))
  ))
);