import { RECEIVE_CHECKOUT_INFO } from '../actions/checkout_actions';
import { merge } from 'lodash/merge';

const checkoutReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  // let newState = merge({}, oldState);

  switch (action.type) {
    case RECEIVE_CHECKOUT_INFO:
      return action.reservationParams;
    default:
      return oldState;
  }
}

export default checkoutReducer;


