import React from 'react';

const Greeting = ({ currentUser, logout, openModal }) => {
  const sessionLinks = () => (
    <div className="login-signup">
      <button onClick={() => openModal('login')}>Login</button>
      <button onClick={() => openModal('signup')}>Signup</button>
    </div>
  );
  const personalGreeting = () => (
    <div className="current-user-logout">
      <p className="header-name">Hi, {currentUser.username}!</p>
      <div className="navButton">     
         <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;