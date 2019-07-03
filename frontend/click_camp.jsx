//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
// import Root from './components/root';
import configureStore from './store/store';

//Testing
import { postUser, postSession, deleteSession } from './util/session_api_util'

document.addEventListener('DOMContentLoaded', () => {

  //Testing
  window.postUser = postUser;
  window.postSession = postSession;
  window.deleteSession = deleteSession;
  //End Testing
 

  const root = document.getElementById('root');
  const store = configureStore();

  //Testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //End Testing



  // let preloadedState = undefined;
  // if (window.currentUser) {
  //   preloadedState = {
  //     session: { currentUser: window.currentUser }
  //   };
  // }
  
  
  ReactDOM.render(<h1>Welcome to clickCamp</h1>, root);
});

