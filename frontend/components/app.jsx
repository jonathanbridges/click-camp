import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import { Link, Redirect  } from 'react-router-dom';

// import { Route } from 'react-router';
// import LoginFormContainer from '../components/session/session_form/login_form_container'
// import SignupFormContainer from '../components/session/session_form/signup_form_container'
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';

const App = () => (
  <div>
    <nav className="main-nav">
      <Modal />
      <div className="left">
        <Link className="nav-home" to="/">CLICKCAMP</Link>

        {/* <a className ="nav-home" href="/">CLICKCAMP</a> */}
      </div>
      <div className="right">
        <GreetingContainer />
      </div>
    </nav>
    <Redirect to="/" />
  </div>
);

export default App;