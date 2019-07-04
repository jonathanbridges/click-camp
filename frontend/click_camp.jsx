//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';

//Testing
import { signup, login, logout } from './actions/session_actions'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //Redux Testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //End Testing


  //Backend Testing
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  //End Testing


  const root = document.getElementById('root');
  
  ReactDOM.render(<Root store={store} />, root);
});

  // let preloadedState = undefined;
  // if (window.currentUser) {
  //   preloadedState = {
  //     session: { currentUser: window.currentUser }
  //   };
  // }
