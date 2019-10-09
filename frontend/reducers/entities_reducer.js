import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import listingsReducer from './listings_reducer'
import reservationsReducer from './reservations_reducer'
import reviewsReducer from './reviews_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer,
  reservations: reservationsReducer,
  reviews: reviewsReducer
});

export default entitiesReducer;
