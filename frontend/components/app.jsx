import React from 'react';
import GreetingContainer from './greeting/greeting_container';
// import { Route } from 'react-router';
// import LoginFormContainer from '../components/session/session_form/login_form_container'
// import SignupFormContainer from '../components/session/session_form/signup_form_container'
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';

const App = () => (
  <nav class="main-nav">
    <Modal />
    <div class="left">
      <h1>clickCamp</h1>
    </div>
    <div class="right">
      <GreetingContainer />
    </div>
  </nav>
);

export default App;