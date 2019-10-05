import { connect } from 'react-redux';
import { createReservation } from '../../actions/reservation_actions';
import { closeModal } from '../../actions/modal_actions'
import Checkout from './checkout';

const mapStateToProps = (state) => {
  let currentUser = state.entities.users[state.session.id];
  let listing = state.entities.listings[Object.keys(state.entities.listings)];
  let reservationParams = state.checkout[1];
  return ({ currentUser, listing, reservationParams });
};

const mapDispatchToProps = dispatch => ({
  createReservation: (reservation) => dispatch(createReservation(reservation)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
