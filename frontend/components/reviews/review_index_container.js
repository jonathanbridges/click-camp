import { connect } from 'react-redux';
import { receiveCurrentUser } from '../../actions/session_actions';
import ReviewIndex from '../reviews/reviews_index'
import { fetchReviews, fetchReview, createReview, deleteReview, updateReview } from '../../actions/review_actions';


const mapStateToProps = (state, ownProps) => {
  debugger;
  let currentUser = state.entities.users[state.session.id];
  let listing = ownProps.listing
  let reviews = state.entities.reviews
  return ({ currentUser, listing, reviews });
}

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: reservation => dispatch(receiveCurrentUser(reservation)),
  fetchReviews: () => dispatch(fetchReviews()),
  fetchReview: id => dispatch(fetchReview(id)),
  creatReview: review => dispatch(createReview(review)),
  updateReview: review => dispatch(updateReview(review)),
  deleteReview: id => dispatch(deleteReview(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewIndex);
