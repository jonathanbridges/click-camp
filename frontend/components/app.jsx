import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import { Route } from 'react-router';
import LoginFormContainer from '../components/session/session_form/login_form_container'
import SignupFormContainer from '../components/session/session_form/signup_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';


const App = () => (
  <div>
    <header>
      <Modal />
      <h1>clickCamp</h1>
      <GreetingContainer />
    </header>
    {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
  </div>
);

export default App;