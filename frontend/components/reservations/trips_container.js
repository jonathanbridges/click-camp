import { connect } from 'react-redux';
import Trips from './trips';
import { fetchListings } from '../../actions/listing_actions';
import { fetchReservationsByUserId } from '../../actions/reservation_actions';
import { receiveCurrentUser } from '../../actions/session_actions';
// import { openModal } from '../../actions/modal_actions'

const mapStateToProps = (state, { match }) => {
  // let listingId = parseInt(match.params.listingId);
  // let listing = state.entities.listings[listingId];
  let currentUser = state.entities.users[state.session.id];
  // let reservations = Object.values(state.entities.reservations);
  // return ({ listing, currentUser, reservations })
  return ({ currentUser });
};

const mapDispatchToProps = dispatch => ({
  fetchListings: () => dispatch(fetchListings()),
  fetchReservationsByUserId: currentUser => dispatch(fetchReservationsByUserId(currentUser)),
  // receiveCurrentUser: reservation => dispatch(receiveCurrentUser(reservation)),
  // openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
