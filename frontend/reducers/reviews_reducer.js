import { RECEIVE_REVIEWS, RECEIVE_REVIEW, REMOVE_REVIEW } from '../actions/review_actions';
import merge from 'lodash/merge';

const reviewsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let nextState;
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews
    case RECEIVE_REVIEW:
      nextState = merge({}, oldState, { [action.review.id]: action.review })
      return nextState;
    case REMOVE_REVIEW:
      nextState = merge({}, oldState)
      delete nextState[action.reviewId]
      return nextState;
    default:
      return oldState;
  }
};

export default reviewsReducer;
