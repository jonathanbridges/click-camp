import React from 'react';
import GreetingContainer from './greeting/greeting_container';
// import { Route } from 'react-router';
// import LoginFormContainer from '../components/session/session_form/login_form_container'
// import SignupFormContainer from '../components/session/session_form/signup_form_container'
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';

const App = () => (
  <nav className="main-nav">
    <Modal />
    <div className="left">
      <h1>clickCamp</h1>
    </div>
    <div className="right">
      <GreetingContainer />
    </div>
  </nav>
);

export default App;