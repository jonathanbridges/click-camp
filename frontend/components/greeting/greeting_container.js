import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions'
import Greeting from './greeting';

const mapStateToProps = ({ session, entities: { users }, ui: { modal } }) => {
  // const mapStateToProps = (state, ownProps) => {

  return {
    currentUser: users[session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
