import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listing_actions';
// import merge from 'lodash/merge';

const listingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return action.listings;
    case RECEIVE_LISTING:
      const newListing = { [action.listing.id]: action.listing };
      return Object.assign({}, state, newListing);
    default:
      return state;
  }
};

export default listingsReducer;
