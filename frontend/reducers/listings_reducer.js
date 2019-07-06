import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listing_actions';
import merge from 'lodash/merge';

const listingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return action.listings;
    case RECEIVE_LISTING:
      return action.listing;
      const newListing = { [action.listing.id]: action.listing };
      return merge({}, state, newListing);
    default:
      return state;
  }
};

export default listingsReducer;
