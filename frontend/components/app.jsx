import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import SplashListingIndexContainer from './listings/splash_listing_index_container'
import DiscoverListingIndexContainer from './listings/discover_listing_index_container';
import ListingsShowContainer from './listings/listing_show_container'
import Footer from './footer/footer'

// import SplashListingIndex from './listings/splash_listing_index';

const App = () => (
  <div>
    {/* Static NavBar */}
    <Modal />
    <nav className="main-nav">
      <div className="left">
        <Link className="nav-home" to="/">CLICKCAMP</Link>
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
      <Route exact path="/discover" component={DiscoverListingIndexContainer} />
      {/* Listing Show Page */}
      <Route exact path="/discover/:listingId" component={ListingsShowContainer} />
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