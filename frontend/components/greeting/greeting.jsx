import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Greeting = ({ currentUser, logout, openModal }) => {
  const sessionLinks = () => (
    <div className="login-signup">
      <button className="nav-btn" onClick={() => openModal('login')}>Log in</button>
      <div>
        <a className="signup-btn" onClick={() => openModal('signup')}>Sign up</a>
      </div>
      {/* <div>
        <a className="demo-btn" onClick={() => openModal('signup')}>Demo Login</a>
      </div> */}
    </div>
  );
  const personalGreeting = () => (
    <div className="current-user-logout">
      <p className="header-name">Hi, {currentUser.username}!</p>
      <div className="logoutButton">     
        <Link to="/" className="nav-btn" onClick={logout}>Log Out</Link>
      </div>
    </div>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;