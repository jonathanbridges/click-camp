import { connect } from 'react-redux';
import { fetchListing } from '../../actions/listing_actions';
import ListingShow from './listing_show';
import { createReservation } from '../../actions/reservation_actions';
import { receiveCurrentUser } from '../../actions/session_actions';

const mapStateToProps = (state, { match }) => {
  let listingId = parseInt(match.params.listingId);
  let listing = state.entities.listings[listingId];
  let currentUser = state.entities.users[state.session.id]
  return ({listing, currentUser})

  // TODO: Selectors for finding Listing details:
  // const listing = selectListing(state.entities, listingId);
  // const reviews = selectReviewsForListing(state.entities, listing);
  // return {
  //   listingId,
  //   listing,
  //   reviews
  // };
};

const mapDispatchToProps = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id)),
  createReservation: reservation => dispatch(createReservation(reservation)),
  receiveCurrentUser: reservation => dispatch(receiveCurrentUser(reservation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingShow);
