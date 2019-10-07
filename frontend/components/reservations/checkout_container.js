import { connect } from 'react-redux';
import { createReservation } from '../../actions/reservation_actions';
// import { receiveCheckoutInfo } from '../../actions/checkout_actions'
import { closeModal } from '../../actions/modal_actions'
import Checkout from './checkout';

const mapStateToProps = (state) => {
  debugger;
  let currentUser = state.entities.users[state.session.id];
  let listing = state.entities.listings[Object.keys(state.entities.listings)];
  let reservationParams = Object.values(state.checkout)[0]
  return ({ currentUser, listing, reservationParams });
};

const mapDispatchToProps = dispatch => ({
  createReservation: (reservation) => dispatch(createReservation(reservation)),
  // receiveCheckoutInfo: () => dispatch(receiveCheckoutInfo),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
