import { connect } from 'react-redux';
import { fetchListing } from '../../actions/listing_actions';
import ListingShow from './listing_show';
import { createReservation, fetchReservationsByUserId } from '../../actions/reservation_actions';
import { receiveCurrentUser } from '../../actions/session_actions';
import { receiveCheckoutInfo } from '../../actions/checkout_actions';
import { openModal } from '../../actions/modal_actions'

const mapStateToProps = (state, { match }) => {
  let listingId = parseInt(match.params.listingId);
  let listing = state.entities.listings[listingId];
  let currentUser = state.entities.users[state.session.id];
  let reservations = Object.values(state.entities.reservations);
  return ({listing, currentUser, reservations})

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
  fetchReservationsByUserId: currentUser => dispatch(fetchReservationsByUserId(currentUser)),
  createReservation: reservation => dispatch(createReservation(reservation)),
  receiveCurrentUser: reservation => dispatch(receiveCurrentUser(reservation)),
  receiveCheckoutInfo: (reservationParams) => dispatch(receiveCheckoutInfo(reservationParams)),
  openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingShow);
