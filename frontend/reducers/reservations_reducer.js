import { RECEIVE_RESERVATIONS, RECEIVE_RESERVATION, RECEIVE_RESERVATIONS_BY_USER_ID, REMOVE_RESERVATION } from '../actions/reservation_actions';
import merge from 'lodash/merge';

const reservationsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      return action.reservations;
    case RECEIVE_RESERVATION:
      const newReservation = { [action.reservation.id]: action.reservation };
      return merge({}, oldState, newReservation);
    case RECEIVE_RESERVATIONS_BY_USER_ID:
      return action.reservations;
    case REMOVE_RESERVATION:
      const nextState = merge({}, oldState)
      delete nextState[action.reservationId]
      return nextState;
    default:
      return oldState;
  }
};

export default reservationsReducer;
