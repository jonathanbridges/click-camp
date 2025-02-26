import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import SplashListingIndexContainer from './listings/splash_listing_index_container';
import SearchContainer from './listings/search_container';
import ListingsShowContainer from './listings/listing_show_container';
import TripsShowContainer from './reservations/trips_container';
import NavSearchBarContainer from './searchbar/navsearchbar_container';

const App = () => (
  <div>
    <Modal />
    {/* Static NavBar */}
    <nav className="main-nav">
      <div className="left">
        <Link className="nav-home" to="/"><img className="clickcamp-text" src="https://app-name-seeds.s3-us-west-1.amazonaws.com/clickcamp-text.png" alt=""/></Link>
        <Route path="/discover" component={NavSearchBarContainer} />
      </div>
      <div className="nav-spacer"></div>
      <div className="right">
        <GreetingContainer />
      </div>
    </nav>

    {/* Main Components */}

    {/* Splash Page Listings */}
    <Route exact path="/" component={SplashListingIndexContainer} />

    <Switch>
      {/* Dicover Page Listings */}
      <Route exact path="/discover" component={SearchContainer} />
      {/* Listing Show Page */}
      <Route exact path="/discover/:listingId" component={ListingsShowContainer} />
      {/* Trips Page */}
      <ProtectedRoute exact path="/trips" component={TripsShowContainer} />
      {/* Unknown Wildcard Redirect */}
      <Redirect to="/" />
    </ Switch>

    {/* Listing Show Page Footer */}
    {/* <Route exact path="/discover/:listingId" component={Footer} />     */}

    {/* Splashpage Footer */}
    {/* <Route exact path="/" component={Footer} />     */}
  </div>
);

export default App;