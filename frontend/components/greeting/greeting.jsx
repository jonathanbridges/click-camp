import React from 'react';

const Greeting = ({ currentUser, logout, openModal }) => {
  const sessionLinks = () => (
    <div className="login-signup">
      <button className="nav-btn" onClick={() => openModal('login')}>Login</button>
      <div>
        <a className="signup-btn" onClick={() => openModal('signup')}>Signup</a>
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
        <button className="nav-btn" onClick={logout}>Log Out</button>
      </div>
    </div>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;