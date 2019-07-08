import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import SplashListingIndexContainer from './listings/splash_listing_index_container'
import DiscoverListingIndexContainer from './listings/discover_listing_index_container';
import Footer from './footer/footer'

// import SplashListingIndex from './listings/splash_listing_index';

const App = () => (
  <div>
    {/* Static NavBar */}
    <nav className="main-nav">
      <Modal />
      <div className="left">
        <Link className="nav-home" to="/">CLICKCAMP</Link>
      </div>
      <div className="right">
        <GreetingContainer />
      </div>
    </nav>

    {/* Main Components */}

    {/* Splash page Listings */}
    <Route exact path="/" component={SplashListingIndexContainer} />

    {/* Dicover page Listings */}
    <Switch>
      <Route exact path="/discover" component={DiscoverListingIndexContainer} />
      <Redirect to="/" />
    </ Switch>
    {/* Splashpage Footer */}
    <Route exact path="/" component={Footer} />    
    {/* Unknown Wildcard Redirect */}
  </div>
);

export default App;