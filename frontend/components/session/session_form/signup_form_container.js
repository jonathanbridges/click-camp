import { connect } from 'react-redux';
import React from 'react';
import { signup, login, clearErrors } from '../../../actions/session_actions';
import { openModal, closeModal } from '../../../actions/modal_actions'
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Join clickCamp',
    greetingSmall: 'Discover the best camping near me'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    processDemo: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    otherForm: (
      <button onClick={() => dispatch(openModal('login'))}>
        Login
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
