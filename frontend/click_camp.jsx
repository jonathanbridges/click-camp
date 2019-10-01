//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';

//Testing
// import { signup, login, logout } from './actions/session_actions'
// import { fetchListing, fetchListings } from './actions/listing_actions'
// import { fetchReservations, fetchReservation, fetchReservationsByUserId, deleteReservation, createReservation } from './util/reservation_api_util'
// import { fetchReservations, fetchReservation, fetchReservationsByUserId, deleteReservation, createReservation } from './actions/reservation_actions'


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

  //AJAX testing//
  // window.fetchReservation = fetchReservation
  // window.fetchReservations = fetchReservations
  // window.createReservation = createReservation
  // window.deleteReservation = deleteReservation
  // window.fetchReservationsByUserId = fetchReservationsByUserId;
  //End Testing

  //Redux Testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // window.fetchListings = fetchListings
  // window.fetchListing = fetchListing
  // window.fetchReservations = fetchReservations
  // window.fetchReservation = fetchReservation
  // window.fetchReservationsByUserId = fetchReservationsByUserId;
  // window.createReservation = createReservation
  // window.deleteReservation = deleteReservation
  

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
