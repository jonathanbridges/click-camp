import React from 'React';
// import NavBarContainer from './nav_bar/nav_bar_container';
import { Route } from 'react-router-dom';

export default () => (
  <div>
    <Route path="/signup" component={SignupContainer} />
    {/* <NavBarContainer /> */}
  </div>
);