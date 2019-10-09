import * as APIUtil from '../util/review_api_util';

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';

// Action creators

export const getReviews = reviews => ({
  type: 'RECEIVE_REVIEWS',
  reviews
});

export const getReview = review => ({
  type: 'RECEIVE_REVIEW',
  review
});

export const removeReview = review => ({
  type: 'REMOVE_REVIEW',
  reviewId: review.id
});



// Thunk action creators

export const fetchReviews = () => dispatch => (
  APIUtil.fetchReviews().then(reviews => 
    dispatch(getReviews(reviews)
  ))
);

export const fetchReview = id => dispatch => (
  APIUtil.fetchReview(id).then(review => (
    dispatch(getReview(review))
  ))
);

export const createReview = (review) => dispatch => (
  APIUtil.createReview(review).then(review => (
    dispatch(getReview(review))
  ))
);

export const updateReview = (review) => dispatch => (
  APIUtil.updateReview(review).then(review => (
    dispatch(getReview(review))
  ))
);

export const deleteReview = (review) => dispatch => (
  APIUtil.deleteReview(review).then(review => (
    dispatch(removeReview(review))
  ))
);