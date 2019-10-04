import { connect } from 'react-redux';
import Trips from './trips';
import { fetchListings } from '../../actions/listing_actions';
import { fetchReservationsByUserId, deleteReservation } from '../../actions/reservation_actions';
import { receiveCurrentUser } from '../../actions/session_actions';
// import { openModal } from '../../actions/modal_actions'

const mapStateToProps = (state, { match }) => {
  let currentUser = state.entities.users[state.session.id];
  let listings = Object.values(state.entities.listings);
  let reservations = Object.values(state.entities.reservations);
  return ({ currentUser, listings, reservations });
};

const mapDispatchToProps = dispatch => ({
  fetchListings: () => dispatch(fetchListings()),
  fetchReservationsByUserId: currentUser => dispatch(fetchReservationsByUserId(currentUser)),
  deleteReservation: id => dispatch(deleteReservation(id)),
  // openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
