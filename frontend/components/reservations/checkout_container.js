import { connect } from 'react-redux';
import { createReservation } from '../../actions/reservation_actions';
import { closeModal } from '../../actions/modal_actions'
import Checkout from './checkout';

const mapStateToProps = (state) => {
  let currentUser = state.entities.users[state.session.id];
  let reservationParams = Object.values(state.checkout)[0]
  return ({ currentUser, reservationParams });
};

const mapDispatchToProps = dispatch => ({
  createReservation: (reservation) => dispatch(createReservation(reservation)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

